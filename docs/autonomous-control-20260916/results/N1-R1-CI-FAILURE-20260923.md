# N1-R1 initial CI failure — 2026-09-23

PR63 candidate3075a89111e03519312bdc57ad96196f4ec1d794, reported generated merge9d7af04546d4697467165bb8421784fb3e94ac58. Quality35791700701 static/browser-smoke PASS. Platform35791700725/job106961466694 FAILED reset-removes-accounts: UNEXPECTED_FAILURE. Controller retrieved job log and confirms firstSQL91, signup5, password/refresh, APITrust, four-context authenticated browser, recovery, logout and count5 PASS; repeatSQL not reached. Primary cleanup and independent cleanup PASS. No reset/zero-account/credential phase acceptance, no merge readiness.

Owner reports artifact10722217174,4009832bytes,digestd969991e0a937b30d133aff994b19c9bf4fc5381c06d47266a7ea96d7a182088,expires2026-09-29; owner archiving. Artifact retrieval/hash not independently checked in this receipt.

Source phase groups CLI reset,userCount0,confirmReset credential request. First two ordinarily emit fixed PROCESS_FAILED/AUTH_COUNT_MISMATCH; generic UNEXPECTED_FAILURE does not prove which stage failed. Request/network/JSON failure is a hypothesis only. No raw suppressed service output sought. No rerun or repair. Independent reviewer prepares minimum stage/error classifier recommendation preserving redaction, failed assertions, timeout and cleanup. Product repair remains independently accepted statically; CI acceptance blocked.
