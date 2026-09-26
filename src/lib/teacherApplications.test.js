import { beforeEach, describe, expect, it, vi } from 'vitest'

const mocks = vi.hoisted(() => ({
  from: vi.fn(),
  storageFrom: vi.fn(),
}))

vi.mock('./supabase', () => ({
  supabase: {
    from: mocks.from,
    storage: { from: mocks.storageFrom },
  },
}))

import { getMyApplication, getUploadCleanupOutcome, submitApplication, uploadDocument } from './teacherApplications'

function readResult(result) {
  const chain = {
    select: vi.fn(() => chain),
    eq: vi.fn(() => chain),
    order: vi.fn(() => chain),
    limit: vi.fn(() => chain),
    maybeSingle: vi.fn(async () => result),
  }
  return chain
}

function updateResult(result) {
  const chain = {
    eq: vi.fn(() => chain),
    select: vi.fn(() => chain),
    single: vi.fn(async () => result),
  }
  return { update: vi.fn(() => chain), chain }
}

function documentInsertResult(result) {
  const chain = {
    select: vi.fn(() => chain),
    single: vi.fn(async () => result),
  }
  return { insert: vi.fn(() => chain), chain }
}

describe('teacher application client contracts', () => {
  beforeEach(() => {
    mocks.from.mockReset()
    mocks.storageFrom.mockReset()
  })

  it.each(['changes_requested', 'rejected'])('maps only the public reason for %s using the returned application ID', async (status) => {
    const app = { id: 'latest-application', user_id: 'owner', status, bio: 'Applicant biography' }
    const applicationRead = readResult({ data: app, error: null })
    const decisionRead = readResult({ data: {
      application_id: app.id, decision_reason: 'Please clarify your experience.',
      admin_notes: 'Private note', reviewed_by: 'reviewer', status: 'approved', bio: 'Unexpected overwrite',
    }, error: null })
    mocks.from.mockReturnValueOnce(applicationRead).mockReturnValueOnce(decisionRead)

    await expect(getMyApplication('owner')).resolves.toEqual({ ...app, decision_reason: 'Please clarify your experience.' })
    expect(mocks.from.mock.calls).toEqual([['teacher_applications'], ['teacher_application_decisions']])
    expect(applicationRead.eq).toHaveBeenCalledWith('user_id', 'owner')
    expect(decisionRead.select).toHaveBeenCalledExactlyOnceWith('application_id, decision_reason')
    expect(decisionRead.eq).toHaveBeenCalledExactlyOnceWith('application_id', 'latest-application')
  })

  it('returns null without a decision lookup when no application exists', async () => {
    mocks.from.mockReturnValue(readResult({ data: null, error: null }))
    await expect(getMyApplication('owner')).resolves.toBeNull()
    expect(mocks.from).toHaveBeenCalledExactlyOnceWith('teacher_applications')
  })

  it('returns no reason when an application has no public decision', async () => {
    const app = { id: 'latest-application', status: 'submitted' }
    mocks.from.mockReturnValueOnce(readResult({ data: app, error: null }))
      .mockReturnValueOnce(readResult({ data: null, error: null }))
    await expect(getMyApplication('owner')).resolves.toEqual({ ...app, decision_reason: null })
  })

  it.each(['application', 'decision'])('propagates the %s lookup error rather than claiming no application', async (source) => {
    const error = new Error('lookup failed')
    mocks.from.mockReturnValueOnce(readResult(source === 'application'
      ? { data: null, error } : { data: { id: 'latest-application' }, error: null }))
      .mockReturnValueOnce(readResult({ data: null, error }))
    await expect(getMyApplication('owner')).rejects.toBe(error)
    expect(mocks.from).toHaveBeenCalledTimes(source === 'application' ? 1 : 2)
  })

  it('submits only the status so the database supplies submitted_at', async () => {
    const update = updateResult({ data: { id: 'application-id', status: 'submitted' }, error: null })
    mocks.from.mockReturnValue(update)

    await expect(submitApplication('application-id')).resolves.toMatchObject({ status: 'submitted' })

    expect(update.update).toHaveBeenCalledWith({ status: 'submitted' })
    expect(update.chain.eq).toHaveBeenCalledWith('id', 'application-id')
  })

  it('removes the uploaded object once when document metadata persistence fails', async () => {
    const metadataError = new Error('metadata write failed')
    const docs = documentInsertResult({ data: null, error: metadataError })
    const remove = vi.fn(async ([path]) => ({ data: [{ name: path }], error: null }))
    const upload = vi.fn(async () => ({ error: null }))
    mocks.from.mockReturnValue(docs)
    mocks.storageFrom.mockReturnValue({ upload, remove })

    await expect(uploadDocument({
      userId: 'user-id', applicationId: 'application-id', docType: 'id',
      file: new File(['x'], 'identity.png', { type: 'image/png' }), label: 'ID',
    })).rejects.toBe(metadataError)

    expect(remove).toHaveBeenCalledTimes(1)
    expect(remove).toHaveBeenCalledWith([upload.mock.calls[0][0]])
    expect(getUploadCleanupOutcome(metadataError)).toBe('removed')
    expect(upload).toHaveBeenCalledTimes(1)
  })

  it.each(['resolved-error', 'rejected', 'unconfirmed'])('reports %s cleanup failure without replacing or exposing provider errors', async (mode) => {
    const metadataError = Object.freeze(new Error('metadata write failed'))
    const cleanupError = new Error('private-bucket/user/path?token=secret')
    const upload = vi.fn(async () => ({ error: null }))
    const remove = vi.fn(() => mode === 'rejected'
      ? Promise.reject(cleanupError)
      : Promise.resolve(mode === 'unconfirmed' ? { data: [], error: null } : { error: cleanupError }))
    mocks.from.mockReturnValue(documentInsertResult({ data: null, error: metadataError }))
    mocks.storageFrom.mockReturnValue({ upload, remove })

    await expect(uploadDocument({ userId: 'user-id', applicationId: 'application-id', docType: 'id',
      file: new File(['x'], 'identity.png', { type: 'image/png' }), label: 'ID' })).rejects.toBe(metadataError)

    expect(remove).toHaveBeenCalledTimes(1)
    expect(remove).toHaveBeenCalledWith([upload.mock.calls[0][0]])
    expect(getUploadCleanupOutcome(metadataError)).toBe('failed')
    expect(metadataError.message).toBe('metadata write failed')
    expect(getUploadCleanupOutcome(cleanupError)).toBeUndefined()
  })

  it('does not attempt cleanup when object upload itself fails', async () => {
    const uploadError = new Error('upload failed')
    const remove = vi.fn(async () => ({ error: null }))
    mocks.storageFrom.mockReturnValue({ upload: vi.fn(async () => ({ error: uploadError })), remove })

    await expect(uploadDocument({
      userId: 'user-id', applicationId: 'application-id', docType: 'id',
      file: new File(['x'], 'identity.png', { type: 'image/png' }), label: 'ID',
    })).rejects.toBe(uploadError)

    expect(remove).not.toHaveBeenCalled()
  })

  it('does not remove a persisted object when signed-url creation later fails', async () => {
    const docs = documentInsertResult({ data: { id: 'document-id' }, error: null })
    const signedError = new Error('signed-url failed')
    const remove = vi.fn(async () => ({ error: null }))
    const upload = vi.fn(async () => ({ error: null }))
    const createSignedUrl = vi.fn(async () => ({ data: null, error: signedError }))
    mocks.from.mockReturnValue(docs)
    mocks.storageFrom.mockReturnValue({ upload, remove, createSignedUrl })

    await expect(uploadDocument({
      userId: 'user-id', applicationId: 'application-id', docType: 'intro_video',
      file: new File(['x'], 'intro.mp4', { type: 'video/mp4' }), label: 'Intro',
    })).rejects.toBe(signedError)

    expect(remove).not.toHaveBeenCalled()
  })
})
