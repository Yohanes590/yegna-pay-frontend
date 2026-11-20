# Yegna Pay — notes for coding agents

Download the full integration brief (**verification modes, curl examples, field table**):

- **In browser:** [Agent Download](/api/agent-download) or the “Agent Download” button on the marketing site / docs header.
- **In repo:** [`../AGENT_INTEGRATION.md`](../AGENT_INTEGRATION.md) (repo root)

## Product rules agents should know

1. **Verification mode is per project (API key)** — `detail_verification` on `Projects`.
   - **ON (default):** receiver name, amount, eligibility date, duplicate checks.
   - **OFF:** receipt/transaction-ID validation (bank domains) + duplicate detection only; no amount/receiver/date match.

2. **Never expose** `yegna_live_*` keys in frontend bundles.

3. **Duplicate transactions** return 409 — treat as “already fulfilled.”

4. **Banks:** `CBE`, `AWASH`, `BOA` via `platform` (see `backend/config/banks.json`).

For Next.js conventions in this app, see existing `client/AGENTS.md` / `CLAUDE.md` if your tooling references them.