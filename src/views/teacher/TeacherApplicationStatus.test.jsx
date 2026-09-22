import React from 'react'
import { act, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const mocks = vi.hoisted(() => ({
  profile: { id: 'owner' },
  getMyApplication: vi.fn(), getDocuments: vi.fn(), submitApplication: vi.fn(), uploadDocument: vi.fn(),
}))
vi.mock('../../contexts/AuthContext', () => ({ useAuth: () => ({ profile: mocks.profile }) }))
vi.mock('../../lib/navigation', () => ({ Link: ({ to, children }) => <a href={to}>{children}</a> }))
vi.mock('../../lib/teacherApplications', async importOriginal => ({
  ...(await importOriginal()),
  getMyApplication: mocks.getMyApplication,
  getDocuments: mocks.getDocuments,
  submitApplication: mocks.submitApplication,
  uploadDocument: mocks.uploadDocument,
}))
import TeacherApplicationStatus from './TeacherApplicationStatus'

const reason = 'Please clarify your experience.'
const application = status => ({ id: 'application', status, decision_reason: reason })
function deferred() {
  let resolve
  const promise = new Promise(done => { resolve = done })
  return { promise, resolve }
}

describe('applicant public decision and load recovery', () => {
  beforeEach(() => {
    vi.stubGlobal('React', React)
    mocks.profile = { id: 'owner' }
    mocks.getMyApplication.mockReset().mockResolvedValue(application('changes_requested'))
    mocks.getDocuments.mockReset().mockResolvedValue([])
    mocks.submitApplication.mockReset()
    mocks.uploadDocument.mockReset()
  })
  afterEach(() => { cleanup(); vi.unstubAllGlobals() })

  it.each(['changes_requested', 'rejected'])('shows the public reason for %s', async status => {
    mocks.getMyApplication.mockResolvedValue(application(status))
    render(<TeacherApplicationStatus />)
    expect(await screen.findByText(reason, { exact: false })).toBeTruthy()
    expect(screen.queryByText('Private note')).toBeNull()
  })

  it.each(['draft', 'submitted', 'in_review', 'approved'])('hides a previous correction reason for %s', async status => {
    mocks.getMyApplication.mockResolvedValue(application(status))
    render(<TeacherApplicationStatus />)
    await screen.findByRole('heading', { name: 'Portfolio & verification' })
    expect(screen.queryByText(reason, { exact: false })).toBeNull()
  })

  it.each(['application', 'decision', 'documents'])('exposes %s load failure and retries without a false empty state', async source => {
    const failed = new Error(`${source} provider detail must not be displayed`)
    if (source === 'documents') mocks.getDocuments.mockRejectedValueOnce(failed)
    else mocks.getMyApplication.mockRejectedValueOnce(failed)
    render(<TeacherApplicationStatus />)
    expect((await screen.findByRole('alert')).textContent).toContain('could not load your application')
    expect(screen.queryByText('No application yet')).toBeNull()
    expect(screen.queryByText(reason, { exact: false })).toBeNull()
    expect(screen.queryByText(failed.message)).toBeNull()
    const retry = deferred()
    mocks.getMyApplication.mockReturnValueOnce(retry.promise)
    fireEvent.click(screen.getByRole('button', { name: 'Retry' }))
    expect(screen.getByRole('status').textContent).toBe('Loading…')
    expect(screen.queryByRole('alert')).toBeNull()
    expect(screen.queryByText('No application yet')).toBeNull()
    await act(async () => retry.resolve(application('changes_requested')))
    expect(await screen.findByText(reason, { exact: false })).toBeTruthy()
    expect(mocks.getMyApplication).toHaveBeenCalledTimes(2)
    expect(mocks.getMyApplication).toHaveBeenLastCalledWith('owner')
    expect(screen.queryByRole('button', { name: 'Retry' })).toBeNull()
  })

  it('shows empty only after a successful lookup with no application', async () => {
    mocks.getMyApplication.mockResolvedValue(null)
    render(<TeacherApplicationStatus />)
    await screen.findByRole('heading', { name: 'No application yet' })
    expect(mocks.getDocuments).not.toHaveBeenCalled()
    expect(screen.queryByRole('alert')).toBeNull()
  })

  it('hides the prior reason after successful resubmission changes the current status', async () => {
    mocks.submitApplication.mockResolvedValue({ ...application('submitted'), submitted_at: '2026-09-23T00:00:00Z' })
    render(<TeacherApplicationStatus />)
    await screen.findByText(reason, { exact: false })
    fireEvent.click(screen.getByRole('button', { name: 'Resubmit for review' }))
    await screen.findByRole('heading', { name: 'Application submitted' })
    expect(screen.queryByText(reason, { exact: false })).toBeNull()
    expect(mocks.submitApplication).toHaveBeenCalledWith('application')
  })

  it('keeps upload failures in the application rather than misreporting a load failure', async () => {
    mocks.uploadDocument.mockRejectedValue(new Error('Upload interrupted'))
    render(<TeacherApplicationStatus />)
    await screen.findByText(reason, { exact: false })
    fireEvent.change(screen.getByLabelText('Intro video file'), {
      target: { files: [new File(['synthetic'], 'intro.mp4', { type: 'video/mp4' })] },
    })
    expect((await screen.findByRole('alert')).textContent).toBe('Upload interrupted')
    expect(screen.getByRole('heading', { name: 'Changes requested' })).toBeTruthy()
    expect(screen.queryByRole('button', { name: 'Retry' })).toBeNull()
  })

  it('ignores an earlier identity response after a later identity load fails', async () => {
    const stale = deferred()
    mocks.getMyApplication.mockReturnValueOnce(stale.promise)
    const { rerender } = render(<TeacherApplicationStatus />)
    mocks.profile = { id: 'other-owner' }
    mocks.getMyApplication.mockRejectedValueOnce(new Error('new identity lookup failed'))
    rerender(<TeacherApplicationStatus />)
    await screen.findByRole('alert')
    await act(async () => stale.resolve(application('rejected')))
    await waitFor(() => expect(screen.getByRole('alert').textContent).toContain('could not load your application'))
    expect(screen.queryByText(reason, { exact: false })).toBeNull()
    expect(screen.queryByText('No application yet')).toBeNull()
  })
})
