'use client';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isOwnedSameTabLink, registerNavigationGuard } from '../../lib/navigationGuard';
import BuilderConfirmation from './BuilderConfirmation';

export default function BuilderExitGuard({ meaningful, copy, onDiscard }) {
  const router = useRouter(), [pending, setPending] = useState(null);
  const release = useRef(() => {}), pendingRef = useRef(null);
  useEffect(() => {
    if (!meaningful) return;
    function ask(destination, proceed) {
      if (pendingRef.current || document.querySelector('dialog[open]')) return;
      // Retain the destination/continuation only; no sketch payload.
      pendingRef.current = { destination, proceed };
      setPending(pendingRef.current);
    }
    const unregister = registerNavigationGuard(ask);
    function unload(event) { event.preventDefault(); event.returnValue = ''; }
    function click(event) {
      const anchor = event.target instanceof Element ? event.target.closest('a[href]') : null;
      if (!anchor || !isOwnedSameTabLink(event, anchor, new URL(window.location.href))) return;
      const url = new URL(anchor.href);
      event.preventDefault(); event.stopPropagation();
      ask(url.href, () => {
        if (url.origin === window.location.origin) router.push(url.pathname + url.search + url.hash);
        else window.location.assign(url.href);
      });
    }
    let released = false;
    function cleanup() {
      if (released) return;
      released = true;
      unregister();
      document.removeEventListener('click', click, true);
      window.removeEventListener('beforeunload', unload);
    }
    release.current = cleanup;
    document.addEventListener('click', click, true);
    window.addEventListener('beforeunload', unload);
    return cleanup;
  }, [meaningful, router]);
  if (!pending) return null;
  return <BuilderConfirmation title={copy.exitTitle} description={copy.exitBody} cancelLabel={copy.keepEditing} confirmLabel={copy.discardSketch}
    onCancel={() => { pendingRef.current = null; setPending(null); }}
    onConfirm={() => { release.current(); onDiscard(); pendingRef.current = null; setPending(null); pending.proceed(); }} />;
}
