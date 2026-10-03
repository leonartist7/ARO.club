import Link from "next/link";
export default function AuthError() {
  return (
    <section className="mx-auto max-w-lg p-8">
      <h1 className="text-3xl">This sign-in link could not be verified.</h1>
      <p className="my-4" role="alert">
        It may have expired, already been used, or account access may be
        unavailable. Request a new link and try again.
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
