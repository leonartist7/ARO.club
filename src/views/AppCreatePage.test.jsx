import React from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from '../test/next-router';
import AppShell from '../components/app/AppShell';
import AppCreatePage, { createEntryState } from './AppCreatePage';
import { getCircleBuilderCopy } from '../i18n/circleBuilder';
import { requestNavigation } from '../lib/navigationGuard';

const copy = getCircleBuilderCopy('en');
beforeEach(() => {
  localStorage.clear(); vi.stubGlobal('React', React);
  HTMLDialogElement.prototype.showModal = function () { this.open = true; };
  HTMLDialogElement.prototype.close = function () { this.open = false; };
});
afterEach(() => { cleanup(); vi.unstubAllGlobals(); vi.restoreAllMocks(); });
function open(path = '/app/create') {
  const router = createMemoryRouter([{ path: '/app', element: <AppShell />, children: [
    { path: 'create', element: <AppCreatePage /> }, { path: 'world', element: <p>World destination</p> },
    { path: 'profile', element: <p>Profile destination</p> },
  ] }], { initialEntries: [path] });
  return render(<RouterProvider router={router} />);
}
function click(name) { const button = screen.getByRole('button', { name, exact: true }); button.focus(); fireEvent.click(button); }

describe('connected guided Create', () => {
  it.each(['Languages', 'Skills', 'Music'])('completes a manual %s sketch with actual summary, targeted edits and cancelled exit', category => {
    const send = vi.spyOn(globalThis, 'fetch'); open();
    click(category); click(copy.ownIdea); click(copy.chooseNext);
    fireEvent.change(screen.getByLabelText(copy.title, { exact: true }), { target: { value: 'F4-PRIVATE-CANARY' } });
    fireEvent.change(screen.getByLabelText(copy.outcome, { exact: true }), { target: { value: 'Practice one thing.' } });
    click(copy.shapeNext); click(copy.detailsNext); click(copy.editPeople);
    fireEvent.change(screen.getByLabelText(copy.detailFields.audience, { exact: true }), { target: { value: 'Adult beginners' } });
    click(copy.returnReview); expect(document.activeElement.id).toBe('builder-summary-details-people');
    click(copy.finishSketch); expect(screen.getByText(copy.readyBody)).toBeTruthy(); expect(screen.getByText('Adult beginners')).toBeTruthy();
    const exit = screen.getByRole('link', { name: 'Return to World' }); exit.focus(); fireEvent.click(exit);
    expect(screen.getByRole('dialog')).toBeTruthy(); click(copy.keepEditing);
    expect(document.activeElement).toBe(exit); expect(screen.getByText('F4-PRIVATE-CANARY')).toBeTruthy();
    expect([...Object.keys(localStorage), ...Object.keys(sessionStorage)].some(key => /CANARY/.test(key))).toBe(false);
    expect(send).not.toHaveBeenCalled();
    fireEvent.click(exit); click(copy.discardSketch); expect(screen.getByText('World destination')).toBeTruthy();
  });
  it('search alone does not guard exits, while category selection guards header profile navigation', () => {
    const first = open(); fireEvent.change(screen.getByLabelText(copy.search), { target: { value: 'no-match' } });
    fireEvent.click(screen.getByRole('link', { name: 'Return to World' })); expect(screen.queryByRole('dialog')).toBeNull();
    expect(screen.getByText('World destination')).toBeTruthy(); first.unmount();
    open(); click('Music'); fireEvent.click(screen.getByRole('link', { name: /profile/i }));
    click(copy.discardSketch); expect(screen.getByText('Profile destination')).toBeTruthy();
  });
  it('blocks programmatic adapter navigation and nested dialog requests; reset removes the guard', () => {
    open(); click('Skills'); const proceed = vi.fn(); act(() => requestNavigation('/app/world', proceed));
    expect(proceed).not.toHaveBeenCalled(); click(copy.keepEditing);
    click(copy.useExample); click(copy.chooseNext); click(copy.shapeNext); click(copy.detailsNext); click(copy.finishSketch); click(copy.startAnother);
    act(() => requestNavigation('/app/world', proceed)); expect(screen.getAllByRole('dialog')).toHaveLength(1);
    fireEvent.click(within(screen.getByRole('dialog')).getByRole('button', { name: copy.startAnother }));
    act(() => requestNavigation('/app/world', proceed)); expect(proceed).toHaveBeenCalledOnce();
  });
  it('registers unload protection only for meaningful edits and cleans it on unmount', () => {
    const view = open();
    const empty = new Event('beforeunload', { cancelable: true }); window.dispatchEvent(empty); expect(empty.defaultPrevented).toBe(false);
    click('Languages'); const edited = new Event('beforeunload', { cancelable: true }); window.dispatchEvent(edited); expect(edited.defaultPrevented).toBe(true);
    view.unmount(); const after = new Event('beforeunload', { cancelable: true }); window.dispatchEvent(after); expect(after.defaultPrevented).toBe(false);
  });
  it('maps only compatible legacy entry modes without populating answers', () => {
    for (const [mode, categoryId] of [['learn', 'languages'], ['share', 'skills'], ['gather', null], ['invalid', null]]) {
      const state = createEntryState('?mode=' + mode); expect(state.categoryId).toBe(categoryId);
      expect(state.fields.title).toBe(''); expect(state.fields.outcome).toBe(''); expect(state.step).toBe('choose');
    }
  });
});
