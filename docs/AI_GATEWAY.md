# ARO AI Gateway integration contract

Vercel project `aro-club` already has team-issued OIDC enabled. Hosted server-side AI SDK calls can authenticate using Vercel OIDC without distributing an API key to browsers. The account dashboard currently requires AI Gateway activation/card verification; no generation request or payment has been made.

Use Vercel AI SDK (`ai`, stable version verified as 7.0.107 on 2026-09-21) from server-only code when the first approved AI feature is implemented. Do not add browser provider keys or copy Supabase service credentials into NEXT_PUBLIC variables. For local development, link the correct Vercel project and refresh the short-lived OIDC environment using the documented Vercel workflow. Keep resulting files ignored.

Before enabling a feature, specify its model allowlist, permitted inputs and retention, authenticated server endpoint, per-user rate limit, input/output token limits, deadline, monthly spend cap and provider-error behavior. Do not automatically substitute more expensive models. Avoid logging raw prompts or personal data. AI drafts remain advisory: sending messages, booking, publishing, payment and visibility changes require explicit human approval and their governing package.

Account activation is not product implementation. The current fictional ARO previews have no live AI behavior; adding a generic public generation endpoint would create an unbounded billing and data-exposure surface. Verify the first bounded feature with synthetic inputs and refusal/provider-failure tests before release.

Official references: [Vercel OIDC authentication](https://vercel.com/docs/ai-gateway/authentication-and-byok/oidc), [AI Gateway budgets](https://vercel.com/docs/ai-gateway/observability/budgets), [AI SDK](https://ai-sdk.dev/docs/introduction).
