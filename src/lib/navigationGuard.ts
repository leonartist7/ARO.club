type NavigationGuard = (destination: string | number, proceed: () => void) => void;
let activeGuard: NavigationGuard | null = null;

export function registerNavigationGuard(guard: NavigationGuard) {
  activeGuard = guard;
  return () => { if (activeGuard === guard) activeGuard = null; };
}

export function requestNavigation(destination: string | number, proceed: () => void) {
  if (activeGuard) activeGuard(destination, proceed);
  else proceed();
}

export function isOwnedSameTabLink(event: MouseEvent, anchor: HTMLAnchorElement, current: URL) {
  if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return false;
  if (anchor.hasAttribute('download') || (anchor.target && anchor.target.toLowerCase() !== '_self')) return false;
  const destination = new URL(anchor.href, current);
  if (!['http:', 'https:'].includes(destination.protocol)) return false;
  // Fragments and identical routes keep the component mounted.
  return destination.origin !== current.origin || destination.pathname !== current.pathname || destination.search !== current.search;
}
