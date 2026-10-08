import { describe, expect, it, vi } from 'vitest';
import { isOwnedSameTabLink, registerNavigationGuard, requestNavigation } from './navigationGuard';

describe('navigation guard ownership and link semantics', () => {
  it('old cleanup cannot unregister a newer owner, and no-guard navigation proceeds once', () => {
    const old = vi.fn(), current = vi.fn(), proceed = vi.fn();
    const releaseOld = registerNavigationGuard(old), releaseCurrent = registerNavigationGuard(current);
    releaseOld(); requestNavigation('/app/world', proceed); expect(current).toHaveBeenCalledOnce(); expect(proceed).not.toHaveBeenCalled();
    releaseCurrent(); requestNavigation('/app/world', proceed); expect(proceed).toHaveBeenCalledOnce();
  });
  it('preserves modified/new-tab/download/fragment semantics and guards external and route changes', () => {
    const current = new URL('http://localhost:3000/app/create');
    const anchor = document.createElement('a'); anchor.href = 'http://localhost:3000/app/world';
    const event = new MouseEvent('click', { button: 0 }); expect(isOwnedSameTabLink(event, anchor, current)).toBe(true);
    for (const modifier of ['ctrlKey', 'metaKey', 'shiftKey', 'altKey']) expect(isOwnedSameTabLink(new MouseEvent('click', { [modifier]: true }), anchor, current)).toBe(false);
    anchor.target = '_blank'; expect(isOwnedSameTabLink(event, anchor, current)).toBe(false);
    anchor.target = ''; anchor.download = ''; expect(isOwnedSameTabLink(event, anchor, current)).toBe(false); anchor.removeAttribute('download');
    anchor.href = current.href + '#app-main'; expect(isOwnedSameTabLink(event, anchor, current)).toBe(false);
    anchor.href = 'https://example.com'; expect(isOwnedSameTabLink(event, anchor, current)).toBe(true);
    anchor.href = 'mailto:hello@example.com'; expect(isOwnedSameTabLink(event, anchor, current)).toBe(false);
  });
});
