# AUTO0 Next.js compatibility evidence

Claim AUTO0-NEXT-20260921-001; base b44c82f59a339c0c240894c981401625df9456de. Separate branch/checkouts/dependencies; N1 preserved. Controller packet blob 07eced640e2a34785b3153d6d0cfdab17148bf55, bound in package v1.0.0 before code.

## Proven baseline failure
Main capture run35611485275/job106371438181 fails before dependency installation at inventory's removed src/lib/routes.jsx. Read-only reproduction confirms safeFile51 → inventory84. The old adapter also launches Vite preview despite Next build output. Main Quality35611485783 and platform35611485672 pass; these are distinct from audit capture. No unchanged rerun was dispatched.

## Implementation and local checks
Committed framework manifest and literal build script select deterministic Next/Vite inventory and fixed CLI commands. Next page provenance preserves route groups/dynamic notation without treating source inventory as runtime acceptance. Existing strict source/file/root/SHA checks remain. Local current-source inventory reports Next,61pages,537.855ms (under30s metadata target).

Synthetic capture rejects local env files and provider/injection settings; unrelated runner credentials are omitted. It validates/removes only disposable untracked framework build output, rebuilds under disabled-account/empty-Supabase configuration, rechecks source and uses the same environment for runtime. No inherited build is trusted. Existing150-case matrix, browser network restriction, manifest and cleanup remain. Server-egress safety also depends on the reviewed committed account/configuration implementation; this is not general certification of arbitrary future provider code.

Commands in isolated checkout: npm ci (exit0; existing15 development-tree audit findings unchanged), node --test tools/autonomy/core.test.mjs (22pass), npm run lint -- --max-warnings=0 (exit0), npm run build (exit0 including TypeScript), git diff --check (exit0). Additional custom-output rejection coverage and case-insensitive env-file guard are included in final candidate verification. No workflow/src/package/lockfile/provider/SQL writes and no extra database audit. Runtime bundle inputs unchanged.

Exact candidate CI capture, downloaded artifact hash,150-case inspection and independent finished-diff review remain required. No acceptance, merge, production deployment, schedule or downstream package activation is implied. Final immutable evidence will be returned to the controller without moving the tested head just to update this note.
