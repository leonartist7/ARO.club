"use client";
import { ErrorState } from "../components/brand/SupportState";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return <ErrorState retry={reset} />;
}
