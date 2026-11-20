import {
    errorCodeReference,
    linkIntegrationPayloads,
    receiptIntegrationPayloads,
    bankPayloads,
    receiptUploadPostmanFields,
} from "@/app/documentation/docs-data";
import type { PublicAgentContext } from "./load-public-context";

export type AgentWorkspaceContext = {
    workspaceId: string;
    projectName: string;
    apiKey: string;
    receiverName: string;
    webhookUrl: string;
    verificationMode: "detailed" | "payment_only";
    eligibilityStartDate: string | null;
};

function replaceKeyAndUrl(source: string, apiKey: string, endpoint: string, receiverName?: string): string {
    return source
        .replace(/YOUR_PROJECT_API_KEY/g, apiKey)
        .replace(/YOUR_YEGNA_HOST/g, endpoint.replace(/\/api\/transaction-create$/, ""))
        .replace(/https:\/\/YOUR_YEGNA_HOST\/api\/transaction-create/g, endpoint)
        .replace(/yegna_live_YOUR_KEY/g, apiKey)
        .replace(/MULUGETA KASSAW CLEANING SERVICE/g, receiverName || "MULUGETA KASSAW CLEANING SERVICE")
        .replace(/process\.env\.NEXT_PUBLIC_BACKEND_URL \|\| \"\"/g, `"${endpoint.replace(/\/api\/transaction-create$/, "")}"`)
        .replace(/os\.environ\[\"NEXT_PUBLIC_BACKEND_URL\"\]/g, `"${endpoint.replace(/\/api\/transaction-create$/, "")}"`);
}

function formatErrorTable(): string {
    const lines = [
        "| Code | HTTP | Name | Category | Handling |",
        "|------|------|------|----------|----------|",
    ];
    for (const row of errorCodeReference) {
        lines.push(
            `| ${row.code} | ${row.status} | ${row.name} | ${row.category} | ${row.handling.replace(/\|/g, "\\|")} |`
        );
    }
    return lines.join("\n");
}

function formatBanksTable(banks: PublicAgentContext["banks"]): string {
    return banks
        .map(
            (b) =>
                `| ${b.platform} | ${b.name} | ${b.link_readable === "pdf" ? "PDF receipt link" : "Web receipt page"} |`
        )
        .join("\n");
}

function formatParamsTable(): string {
    const rows = receiptUploadPostmanFields.map(
        (f) => `| \`${f.key}\` | ${f.type} | ${f.value} | ${f.description} |`
    );
    return [
        "| Field | Type | Example | Description |",
        "|-------|------|---------|-------------|",
        ...rows,
        "| `transaction_id` | Text | Bank link or ID | Required for JSON method if no `receipt_image`. |",
        "| `transaction_url` | Text | Same as transaction_id | Alias accepted by API. |",
    ].join("\n");
}

export function generateAgentDoc(
    publicCtx: PublicAgentContext,
    workspace: AgentWorkspaceContext | null
): string {
    const apiKey = workspace?.apiKey ?? "(sign in and download from dashboard for your live key)";
    const receiverName = workspace?.receiverName || "Your payment receiver name";
    const endpoint = publicCtx.transactionEndpoint;
    const generatedAt = new Date().toISOString();

    const curlLink = replaceKeyAndUrl(linkIntegrationPayloads.curl, apiKey, endpoint, receiverName);
    const curlReceipt = replaceKeyAndUrl(receiptIntegrationPayloads.curl, apiKey, endpoint, receiverName);
    const jsLink = replaceKeyAndUrl(linkIntegrationPayloads.javascript, apiKey, endpoint, receiverName);
    const pyLink = replaceKeyAndUrl(linkIntegrationPayloads.python, apiKey, endpoint, receiverName);

    const workspaceSection = workspace
        ? `## Your workspace (pre-filled)

| Setting | Value |
|---------|--------|
| Workspace ID | \`${workspace.workspaceId}\` |
| Project name | ${workspace.projectName} |
| Live API key | \`${workspace.apiKey}\` |
| Receiver name | ${workspace.receiverName || "— (payment-only mode)"} |
| Verification mode | **${workspace.verificationMode === "detailed" ? "Detailed" : "Payment-only"}** |
| Eligibility start date | ${workspace.eligibilityStartDate || "—"} |
| Webhook callback URL | ${workspace.webhookUrl || "— (not set)"} |
`
        : `## Workspace credentials

You are viewing the **public template**. Sign in at ${publicCtx.dashboardUrl}/dashboard, open a project → **Developer** tab, and download the **personalized** agent guide (includes your live API key).

`;

    return `# YegnaPay Agent Integration Guide

> Generated ${generatedAt}. Hand this file to your AI coding agent — all URLs and keys below are ready to use${workspace ? " for this workspace" : " except the live API key (sign in to personalize)"}.

## Base URL

- **API origin:** \`${publicCtx.baseUrl}\`
- **Verify payment:** \`POST ${endpoint}\`
- **Dashboard:** ${publicCtx.dashboardUrl}

## Authentication

\`\`\`http
Authorization: Bearer ${apiKey}
\`\`\`

Alternative header: \`x-api-key: ${apiKey}\`

${workspaceSection}

## Supported banks

| Platform | Bank | Receipt type |
|----------|------|----------------|
${formatBanksTable(publicCtx.banks)}

## Verification mode for this workspace

${
    workspace?.verificationMode === "payment_only"
        ? `**Payment-only** — valid bank receipt for the transaction ID (allowed receipt domains from server config) + duplicate check. Amount, receiver name, and eligibility date checks are **skipped**.`
        : `**Detailed** — amount, receiver name (vs \`${receiverName}\`), eligibility date${workspace?.eligibilityStartDate ? ` (on/after ${workspace.eligibilityStartDate})` : ""}, and duplicate checks.`
}

## Parameters (transaction-create)

${formatParamsTable()}

## Method A — Transaction link (JSON)

\`\`\`bash
${curlLink}
\`\`\`

### Bank-specific JSON examples

**CBE:**
\`\`\`json
${bankPayloads.cbe}
\`\`\`

**AWASH:**
\`\`\`json
${bankPayloads.awash}
\`\`\`

**BOA:**
\`\`\`json
${bankPayloads.boa}
\`\`\`

### Node.js

\`\`\`javascript
${jsLink}
\`\`\`

### Python

\`\`\`python
${pyLink}
\`\`\`

## Method B — Receipt image (multipart FormData)

\`\`\`bash
${curlReceipt}
\`\`\`

## Expected success response

\`\`\`json
{
  "status": 200,
  "success": true,
  "transaction_status": "VERIFIED",
  "message": "Transaction Verified Successfully",
  "data": {
    "transaction_id": "…",
    "transaction_amount": 4000,
    "method": "CBE",
    "status": "verified",
    "currency": "ETB"
  }
}
\`\`\`

## Error codes (from Yegna Pay documentation)

Every error returns \`success: false\`, \`message\`, and \`error_code\` (YP_* taxonomy).

${formatErrorTable()}

## Webhooks

${
    workspace?.webhookUrl
        ? `This workspace posts verification results to: \`${workspace.webhookUrl}\`. Treat webhooks as idempotent.`
        : "Set a webhook URL in project settings to receive async verification callbacks."
}

## Agent implementation checklist

- [ ] Store API key in server-side secrets only (\`${apiKey.startsWith("yegna_") ? apiKey.slice(0, 20) + "…" : "your key"}\`).
- [ ] Call \`${endpoint}\` with \`price_amount\` equal to order total.
- [ ] On \`YP_03DeFg\` / HTTP 409, do not fulfill the order twice.
- [ ] Respect **${workspace?.verificationMode ?? "project"}** verification mode — do not re-implement receiver checks client-side in payment-only mode.
- [ ] Human-readable API reference: ${publicCtx.dashboardUrl}/documentation

## Billing (reference)

${publicCtx.freeRequests != null ? `- Free tier: ${publicCtx.freeRequests} verifications/month` : ""}
${publicCtx.costPerRequest != null ? `- Cost per verification: ${publicCtx.costPerRequest} ${publicCtx.currency || "ETB"}` : ""}

---
*Source: Yegna Pay documentation (\`docs-data\`), live config from \`${publicCtx.baseUrl}/api/config/public\`, workspace from dashboard.*
`;
}