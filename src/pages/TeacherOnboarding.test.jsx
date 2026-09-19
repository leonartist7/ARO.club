import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const mocks = vi.hoisted(() => ({
  navigate: vi.fn(),
  getOrCreateDraft: vi.fn(),
  updateApplication: vi.fn(),
  profileUpdate: vi.fn(),
}))

vi.mock('../contexts/AuthContext', () => ({
  useAuth: () => ({ user: { id: 'user-id' } }),
}))

vi.mock('../lib/supabase', () => ({
  supabase: {
    from: () => ({ update: mocks.profileUpdate }),
  },
}))

vi.mock('../lib/teacherApplications', () => ({
  getOrCreateDraft: mocks.getOrCreateDraft,
  updateApplication: mocks.updateApplication,
}))

vi.mock('react-router-dom', async (importOriginal) => ({
  ...(await importOriginal()),
  useNavigate: () => mocks.navigate,
}))

import TeacherOnboarding from './TeacherOnboarding'

describe('teacher onboarding draft handoff', () => {
  beforeEach(() => vi.stubGlobal('React', React))
  afterEach(() => vi.unstubAllGlobals())

  it('persists profile and an editable draft, then routes to document collection without submitting', async () => {
    const eq = vi.fn(async () => ({ error: null }))
    mocks.navigate.mockReset()
    mocks.profileUpdate.mockReset()
    mocks.profileUpdate.mockReturnValue({ eq })
    mocks.getOrCreateDraft.mockReset()
    mocks.getOrCreateDraft.mockResolvedValue({ id: 'draft-id', status: 'draft' })
    mocks.updateApplication.mockReset()
    mocks.updateApplication.mockResolvedValue({ id: 'draft-id', status: 'draft' })

    render(<TeacherOnboarding />)
    fireEvent.change(screen.getByPlaceholderText("What's your name?"), { target: { value: 'Ada' } })
    fireEvent.click(screen.getByRole('button', { name: 'Continue' }))
    await screen.findByRole('heading', { name: 'What languages do you teach?' })
    fireEvent.click(screen.getAllByRole('button')[1])
    fireEvent.click(screen.getByRole('button', { name: 'Skip remaining' }))
    await screen.findByRole('heading', { name: 'What experiences can you offer?' })
    fireEvent.click(screen.getAllByRole('button')[1])
    fireEvent.click(screen.getByRole('button', { name: 'Skip remaining' }))
    await screen.findByRole('heading', { name: 'Create Your Avatar' })
    fireEvent.click(screen.getByRole('button', { name: 'Continue' }))
    await screen.findByRole('heading', { name: 'Tell Students About Yourself' })
    fireEvent.change(screen.getByPlaceholderText("I'm passionate about teaching..."), {
      target: { value: 'Synthetic browser-safe draft evidence that exceeds the required biography length.' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Continue' }))
    await screen.findByRole('heading', { name: 'Ready to Submit!' })
    fireEvent.click(screen.getByRole('button', { name: 'Submit for Verification' }))

    await waitFor(() => expect(mocks.navigate).toHaveBeenCalledWith('/teacher/application'))
    expect(mocks.getOrCreateDraft).toHaveBeenCalledWith('user-id', { display_name: 'Ada' })
    expect(mocks.updateApplication).toHaveBeenCalledWith('draft-id', expect.objectContaining({
      display_name: 'Ada',
      languages: [{ code: 'es', name: 'Spanish', proficiency: 'native' }],
      experience_types: ['cooking'],
      agreed_to_standards: true,
    }))
    expect(mocks.updateApplication.mock.calls[0][1]).not.toHaveProperty('status')
  })
})
