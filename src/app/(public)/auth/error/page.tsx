import Link from "next/link";
export default function AuthError() {
  return (
    <section className="mx-auto max-w-lg p-8">
      <h1 className="text-3xl">This sign-in link could not be verified.</h1>
      <p className="my-4" role="alert">
        The link may have expired or already been used. If this was an email
        confirmation, try signing in—your address may already be confirmed. For
        a password reset, request a new link.
      </p>
      <Link href="/forgot-password" className="underline">
        Request a recovery link
      </Link>
      <p>
        <Link href="/login" className="underline">
          Return to sign in
        </Link>
      </p>
    </section>
  );
}
