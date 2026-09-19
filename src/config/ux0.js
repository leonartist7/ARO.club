/**
 * UX0 remains source-controlled and fail-closed until the parent I0 gates pass.
 *
 * The sole exception is the founder-approved disposable CI browser compile: its
 * marker is necessary but deliberately not sufficient. The running browser
 * must also be at a loopback HTTP origin, so an accidentally supplied build
 * marker cannot enable account access in Preview, production, or a remote host.
 */
export function allowsDisposableCiAuthenticatedBrowser(compileMarker, origin) {
  if (compileMarker !== true || typeof origin !== 'string') return false;
  try {
    const url = new URL(origin);
    return url.protocol === 'http:' && ['127.0.0.1', 'localhost', '::1'].includes(url.hostname);
  } catch {
    return false;
  }
}

const disposableCiCompileMarker = import.meta.env?.VITE_ARO_DISPOSABLE_CI_AUTH_BROWSER === 'true';
const browserOrigin = typeof window === 'undefined' ? undefined : window.location.origin;

export const UX0_PROTOTYPE_MODE = !allowsDisposableCiAuthenticatedBrowser(
  disposableCiCompileMarker,
  browserOrigin,
);
