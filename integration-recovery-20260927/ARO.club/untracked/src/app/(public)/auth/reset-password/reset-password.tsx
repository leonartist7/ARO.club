"use client";
import { useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import { supabase } from "../../../../lib/supabase";
export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState(false);
  async function submit(event: FormEvent) {
    event.preventDefault();
    if (password.length < 8 || password !== confirm) {
      setMessage(
        "Use at least eight characters and make sure both passwords match.",
      );
      return;
    }
    setPending(true);
    setMessage("");
    try {
      if (!supabase) throw new Error("Account access is unavailable.");
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      await supabase.auth.signOut();
      setSuccess(true);
      setMessage(
        "Your password has been updated. Sign in with your new password.",
      );
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "We could not update your password. Request a new recovery link.",
      );
    } finally {
      setPending(false);
    }
  }
  return (
    <section className="mx-auto max-w-lg p-8">
      <h1 className="text-3xl">Reset your password</h1>
      <p role="status" className="my-4">
        {message}
      </p>
      {success ? (
        <Link href="/login" className="underline">
          Sign in
        </Link>
      ) : (
        <form onSubmit={submit} className="space-y-4">
          <label className="block">
            New password
            <input
              className="block w-full rounded border p-3 text-ink"
              type="password"
              autoComplete="new-password"
              minLength={8}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <label className="block">
            Confirm password
            <input
              className="block w-full rounded border p-3 text-ink"
              type="password"
              autoComplete="new-password"
              required
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
          </label>
          <button
            className="rounded bg-primary-600 p-3 text-white"
            disabled={pending}
          >
            {pending ? "Updating…" : "Update password"}
          </button>
        </form>
      )}
    </section>
  );
}
