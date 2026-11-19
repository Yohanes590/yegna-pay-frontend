# Yegna Pay — Agent & Integration Guide

Use this guide when wiring Yegna Pay into a storefront, mobile app, or backend service. Give this file to coding agents (Cursor, Copilot, etc.) so they integrate without reverse-engineering the dashboard.

## 1. Quick start

1. Sign up at Yegna Pay and create a **project** (workspace).
2. Copy the **live API key** (`yegna_live_…`).
3. Choose a **verification mode** on the project (see §4).
4. Call `POST /api/transaction-create` with the customer’s bank receipt reference or URL.

**Base URL (production):** set via your deployment — typically your Yegna Pay API host + `/api/transaction-create`.

**Auth:** `Authorization: Bearer <API_KEY>` or header `x-api-key: <API_KEY>`.

## 2. Verify a payment (JSON)

```bash
curl -X POST "https://YOUR_YEGNA_HOST/api/transaction-create" \
  -H "Authorization: Bearer yegna_live_YOUR_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "platform": "CBE",
    "transaction_id": "FT26063D7W5C11294152",
    "price_amount": "1500",
    "full_name": "Customer Name",
    "currency": "ETB"
  }'
```

### Common fields

| Field | Required | Description |
|-------|----------|-------------|
| `price_amount` | Yes | Expected payment amount (positive number). |
| `platform` | Recommended | `CBE`, `AWASH`, or `BOA`. |
| `transaction_url` | One of | Full bank receipt URL on the official domain. |
| `transaction_id` | One of | Reference ID or URL fragment. |
| `receipt_image` | One of | Multipart file — QR on receipt (use FormData). |
| `full_name` | Optional | Payer hint (detailed mode uses project rules). |
| `currency` | Optional | Usually `ETB`. |

## 3. Supported banks

| Platform | Typical use |
|----------|-------------|
| `CBE` | Commercial Bank of Ethiopia (PDF receipt link) |
| `AWASH` | Awash Bank receipt page |
| `BOA` | Bank of Abyssinia receipt page |

Domains are configured server-side (`CBE_DOMAIN`, `AWASH_DOMAIN`, `BOA_DOMAIN`) — do not hardcode scraper URLs in client apps.

## 4. Verification modes (per API key / project)

Configured in the dashboard when creating or editing a project.

### Detailed verification (default, toggle ON)

Yegna Pay enforces the **full merchant workflow**:

- Fetches receipt from the bank
- Matches **receiver name** on the receipt to the project’s payment receiver name
- Matches **amount** to `price_amount`
- Enforces **transaction eligibility start date**
- Blocks **duplicate** `transaction_id` (409)

Use for: shops that must confirm money landed in the **correct named account**.

### Payment-only verification (toggle OFF)

Lightweight mode for the same API key:

- Fetches receipt from the bank
- Matches **amount** to `price_amount` (payment valid)
- Blocks **duplicate** `transaction_id`
- **Skips** receiver-name and eligibility-date checks

Use for: “is this payment real and not already used?” without enforcing account holder name rules.

> Duplicate detection always runs in both modes (pre-check + database unique constraint).

## 5. Responses

Successful verification returns `transaction_status: "VERIFIED"` (shape unchanged from public API docs).

Common errors (non-exhaustive):

| Situation | Typical code family |
|-----------|---------------------|
| Duplicate transaction | `DUPLICATE_TRANSACTION` (409) |
| Amount mismatch | `AMOUNT_MISMATCH` |
| Receiver mismatch (detailed mode) | `RECEIVER_MISMATCH` |
| Invalid platform / URL | `INVALID_PLATFORM_OR_URL` |
| Bank fetch failed | `BANK_RECEIPT_FETCH_FAILED` |

See in-app **Documentation → Error Codes** for the full YP taxonomy.

## 6. Webhooks

If you set a **Webhook Callback URL** on the project, Yegna Pay can notify your server after verification (configure in project settings). Your endpoint should be idempotent and re-check order state.

## 7. Agent checklist

When implementing Yegna Pay in a new codebase:

- [ ] Store API key in secrets, never in frontend bundles.
- [ ] Send `price_amount` as the order total the customer should have paid.
- [ ] Pass `platform` explicitly when possible.
- [ ] On 409 duplicate, show “already paid” — do not fulfill twice.
- [ ] Respect project **verification mode** (don't re-implement receiver checks client-side if payment-only).
- [ ] Use multipart only when uploading `receipt_image`.

## 8. Dashboard links

- Create project: `/dashboard/create-project`
- Per-project settings (mode, receiver, webhook): project → Settings
- Human API docs: `/documentation`

## 9. Version

Generated for Yegna Pay multi-bank verification (CBE, Awash, BOA). API routes and field names are stable; extend this file when new banks appear in `backend/config/banks.json`.