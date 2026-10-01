'use client';
import { useEffect, useId, useRef } from 'react';
import Button from '../../components/ui/Button';

export default function BuilderConfirmation({ title, description, children, cancelLabel, confirmLabel, onCancel, onConfirm }) {
  const dialog = useRef(null), cancel = useRef(null), id = useId();
  useEffect(() => {
    const node = dialog.current, trigger = document.activeElement;
    node.showModal();
    cancel.current.focus();
    return () => { node.close(); trigger?.focus(); };
  }, []);
  return <dialog ref={dialog} aria-labelledby={id + '-title'} aria-describedby={id + '-description'}
    onCancel={event => { event.preventDefault(); onCancel(); }}
    onKeyDown={event => {
      if (event.key !== 'Tab') return;
      const controls = [...dialog.current.querySelectorAll('button:not(:disabled)')];
      const first = controls[0], last = controls.at(-1);
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }}
    className="w-[calc(100%-2rem)] max-w-lg rounded-2xl border border-control-border bg-surface-card p-6 text-content-primary shadow-xl backdrop:bg-ink/50 dark:bg-surface-darkCard dark:text-content-dark">
    <h2 id={id + '-title'} className="text-2xl font-bold">{title}</h2>
    <p id={id + '-description'} className="mt-3 text-base">{description}</p>
    <div className="my-4 break-words text-base">{children}</div>
    <div className="flex flex-wrap gap-3">
      <button ref={cancel} type="button" onClick={onCancel} className="min-h-11 rounded-lg border border-control-border px-4 py-2 font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">{cancelLabel}</button>
      <Button type="button" onClick={onConfirm} className="motion-reduce:transition-none">{confirmLabel}</Button>
    </div>
  </dialog>;
}
