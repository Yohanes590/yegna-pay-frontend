import { buildBackendEndpointUrl } from "@/lib/backend-url";

export const TRANSACTION_CREATE_ENDPOINT = buildBackendEndpointUrl("/api/transaction-create");

export const docSections = [
    { id: "introduction", label: "Introduction" },
    { id: "authentication", label: "Authentication" },
    { id: "endpoint", label: "API Endpoint" },
    { id: "parameters", label: "Parameters Schema" },
    { id: "verification-methods", label: "Verification Methods" },
    { id: "examples", label: "Bank Link Payloads" },
    { id: "integration", label: "Code Examples" },
    { id: "expected-response", label: "Expected Response" },
    { id: "error-codes", label: "Error Codes Reference" },
    { id: "pipeline", label: "Verification Pipeline" },
    { id: "best-practices", label: "Best Practices" },
];

export interface ErrorCodeDocEntry {
    code: string;
    status: number;
    name: string;
    category: "Client Error" | "Application Error" | "Server Error";
    meaning: string;
    whenItOccurs: string;
    handling: string;
}

export const errorCodeReference: ErrorCodeDocEntry[] = [
    // CLIENT_ERRORS
    {
        code: "YP_009enfe",
        status: 400,
        name: "INVALID_REQUEST",
        category: "Client Error",
        meaning: "Invalid request payload",
        whenItOccurs: "Request body is empty, malformed JSON, or invalid update structure.",
        handling: "Fix request JSON syntax or body structure before retrying.",
    },
    {
        code: "YP_01AbcD",
        status: 400,
        name: "MISSING_REQUIRED_FIELD",
        category: "Client Error",
        meaning: "A required field is missing",
        whenItOccurs: "Neither receipt_image nor transaction_id/transaction_url was provided, or required params are missing.",
        handling: "Include all required fields for Method A (receipt_image) or Method B (transaction_id).",
    },
    {
        code: "YP_02xYzA",
        status: 400,
        name: "INVALID_AMOUNT",
        category: "Client Error",
        meaning: "Invalid transaction amount",
        whenItOccurs: "price_amount is missing, non-numeric, or less than or equal to 0.",
        handling: "Pass a valid positive numeric amount in price_amount.",
    },
    {
        code: "YP_05KlMn",
        status: 400,
        name: "INVALID_PLATFORM_OR_URL",
        category: "Client Error",
        meaning: "Unsupported bank platform or invalid transaction URL",
        whenItOccurs: "Unknown platform value, invalid bank receipt URL domain/port, or transaction ID cannot be extracted.",
        handling: "Verify platform (CBE, AWASH, BOA) and pass an unmodified bank receipt URL.",
    },
    {
        code: "YP_06OpQr",
        status: 400,
        name: "INVALID_RECEIPT_IMAGE",
        category: "Client Error",
        meaning: "Invalid receipt image upload",
        whenItOccurs: "Uploaded file is empty, exceeds 5 MB, uses an unexpected field name, or is not PNG/JPG/JPEG.",
        handling: "Upload a valid PNG, JPG, or JPEG file <= 5 MB under the receipt_image FormData field.",
    },
    {
        code: "YP_07StUv",
        status: 400,
        name: "QR_CODE_NOT_FOUND",
        category: "Client Error",
        meaning: "No QR code detected in the uploaded receipt image",
        whenItOccurs: "No readable QR code could be decoded from the uploaded receipt image.",
        handling: "Prompt the user to upload a clearer receipt image or submit the bank transaction link via Method B.",
    },
    {
        code: "YP_08WxYz",
        status: 400,
        name: "INVALID_DATE_RANGE",
        category: "Client Error",
        meaning: "Invalid date format or eligibility configuration",
        whenItOccurs: "Project eligibility start date configuration is invalid or malformed.",
        handling: "Check the project eligibility start date setting (YYYY-MM-DD).",
    },
    {
        code: "YP_09CdEf",
        status: 401,
        name: "UNAUTHORIZED",
        category: "Client Error",
        meaning: "Unauthorized access",
        whenItOccurs: "Missing or invalid project API key, or missing/expired dashboard user session.",
        handling: "Provide a valid project secret key in Authorization: Bearer <key> or x-api-key.",
    },
    {
        code: "YP_10GhIj",
        status: 401,
        name: "ACCOUNT_BANNED",
        category: "Client Error",
        meaning: "This account has been banned",
        whenItOccurs: "The merchant account owning the project is suspended or inactive.",
        handling: "Contact Yegna Pay support to restore account status.",
    },
    {
        code: "YP_11KmNp",
        status: 403,
        name: "FORBIDDEN",
        category: "Client Error",
        meaning: "Access denied",
        whenItOccurs: "Authenticated user does not own the requested project resource.",
        handling: "Ensure the request targets a project belonging to the authenticated account.",
    },
    {
        code: "YP_12QrSt",
        status: 404,
        name: "PROJECT_NOT_FOUND",
        category: "Client Error",
        meaning: "Associated project not found",
        whenItOccurs: "No project or image record matches the provided API key or identifier.",
        handling: "Verify the project API key or resource ID.",
    },
    {
        code: "YP_13UvWx",
        status: 429,
        name: "RATE_LIMIT_EXCEEDED",
        category: "Client Error",
        meaning: "Too many requests. Rate limit exceeded",
        whenItOccurs: "Caller exceeds the API rate limit window.",
        handling: "Back off and retry after the rate limit window resets.",
    },
    // APPLICATION_ERRORS
    {
        code: "YP_03DeFg",
        status: 409,
        name: "DUPLICATE_TRANSACTION",
        category: "Application Error",
        meaning: "This transaction has already been verified",
        whenItOccurs: "The transaction_id has already been verified and persisted (including concurrent replay attempts).",
        handling: "Do not credit the order again; treat as an already-used receipt.",
    },
    {
        code: "YP_14YzAb",
        status: 402,
        name: "INSUFFICIENT_QUOTA",
        category: "Application Error",
        meaning: "Insufficient verification quota",
        whenItOccurs: "The merchant account has exhausted free and paid verification credits.",
        handling: "Top up verification credits in the Yegna Pay dashboard.",
    },
    {
        code: "YP_15CdEf",
        status: 400,
        name: "BANK_RECEIPT_FETCH_FAILED",
        category: "Application Error",
        meaning: "Unable to fetch or parse bank receipt",
        whenItOccurs: "The bank portal did not return a valid receipt for the transaction reference.",
        handling: "Confirm the transaction link/ID is complete and published by the bank, then retry.",
    },
    {
        code: "YP_16GhJk",
        status: 400,
        name: "RECEIVER_MISMATCH",
        category: "Application Error",
        meaning: "Receiver information does not match the project recipient",
        whenItOccurs: "The recipient name on the bank receipt does not match the project receiver_name.",
        handling: "Reject payment; transfer was sent to a different recipient account.",
    },
    {
        code: "YP_17MnPq",
        status: 400,
        name: "AMOUNT_MISMATCH",
        category: "Application Error",
        meaning: "Transaction amount does not match the requested price",
        whenItOccurs: "Transferred amount on the bank receipt differs from price_amount.",
        handling: "Reject payment or request the exact expected order amount.",
    },
    {
        code: "YP_18RsTu",
        status: 400,
        name: "INVALID_RECEIPT_DATE",
        category: "Application Error",
        meaning: "Could not read valid payment date from receipt",
        whenItOccurs: "The bank receipt date/timestamp could not be parsed reliably.",
        handling: "Verify the receipt link directly or contact support if bank formatting changed.",
    },
    {
        code: "YP_19VwXy",
        status: 400,
        name: "TRANSACTION_DATE_EXPIRED",
        category: "Application Error",
        meaning: "Transaction date is outside the allowed verification period",
        whenItOccurs: "The bank payment timestamp is older than the project eligibility start date.",
        handling: "Reject stale receipts dated before your project's configured start date.",
    },
    {
        code: "YP_20ZaBc",
        status: 400,
        name: "VERIFICATION_FAILED",
        category: "Application Error",
        meaning: "Transaction verification failed",
        whenItOccurs: "Verification did not pass business-rule checks.",
        handling: "Inspect the returned message and prompt the customer for a valid payment proof.",
    },
    // SERVER_ERRORS
    {
        code: "YP_04GhIj",
        status: 500,
        name: "INTERNAL_SERVER_ERROR",
        category: "Server Error",
        meaning: "Internal Server Error",
        whenItOccurs: "An unexpected unhandled server error occurred.",
        handling: "Retry with exponential backoff and report error_code if the issue persists.",
    },
    {
        code: "YP_21DeFg",
        status: 500,
        name: "IMAGE_PROCESSING_ERROR",
        category: "Server Error",
        meaning: "Failed to process receipt image",
        whenItOccurs: "Server-side image compression or processing failed unexpectedly.",
        handling: "Retry the upload or submit the bank transaction link directly via Method B.",
    },
    {
        code: "YP_22HiJk",
        status: 502,
        name: "CLOUD_UPLOAD_ERROR",
        category: "Server Error",
        meaning: "Failed to upload receipt image to cloud storage",
        whenItOccurs: "Cloud image storage returned an unexpected failure.",
        handling: "Retry the request shortly.",
    },
    {
        code: "YP_23LmNo",
        status: 500,
        name: "DATABASE_ERROR",
        category: "Server Error",
        meaning: "Internal Server Error",
        whenItOccurs: "An unexpected database operation failure occurred (internal details are never exposed).",
        handling: "Retry safely; contact support with the timestamp and error_code if persistent.",
    },
];

export const receiptUploadPostmanFields = [
    { key: "full_name", type: "Text", value: "JOHN DOE ENTERPRISE", description: "Expected recipient or merchant name." },
    { key: "currency", type: "Text", value: "ETB", description: "Transaction currency (defaults to ETB)." },
    { key: "platform", type: "Text", value: "AWASH", description: "Bank platform identifier (CBE, AWASH, BOA)." },
    { key: "price_amount", type: "Text", value: "1050", description: "Expected payment amount (positive number)." },
    { key: "receipt_image", type: "File", value: "Upload original bank receipt image", description: "PNG, JPG, or JPEG receipt image (max 5 MB)." },
];

export const receiptUploadTextExample = `full_name: JOHN DOE ENTERPRISE
currency: ETB
platform: AWASH
price_amount: 1050
receipt_image: [Uploaded receipt image]`;

export const transactionLinkExample = `{
  "full_name": "MULUGETA KASSAW CLEANING SERVICE",
  "price_amount": "4000",
  "platform": "cbe",
  "currency": "ETB",
  "transaction_id": "https://apps.cbe.com.et:100/?id=FT26063D7W5C11294152"
}`;

export const bankPayloads = {
    cbe: `{
  "full_name": "MULUGETA KASSAW CLEANING SERVICE",
  "price_amount": "4000",
  "platform": "cbe",
  "currency": "ETB",
  "transaction_id": "https://apps.cbe.com.et:100/?id=FT26063D7W5C11294152"
}`,
    awash: `{
  "full_name": "JOHN DOE ENTERPRISE",
  "price_amount": "1050",
  "platform": "AWASH",
  "currency": "ETB",
  "transaction_id": "https://awashpay.awashbank.com:8225/-2KCLVVWOY3-4R75E0"
}`,
    boa: `{
  "full_name": "JOHN DOE ENTERPRISE",
  "price_amount": "4000",
  "platform": "BOA",
  "currency": "ETB",
  "transaction_id": "https://cs.bankofabyssinia.com/slip/?trx=FT23123456"
}`,
};

export const linkIntegrationPayloads = {
    curl: `curl -X POST "${TRANSACTION_CREATE_ENDPOINT}" \\
  -H "Authorization: Bearer YOUR_PROJECT_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "full_name": "MULUGETA KASSAW CLEANING SERVICE",
    "price_amount": "4000",
    "platform": "cbe",
    "currency": "ETB",
    "transaction_id": "https://apps.cbe.com.et:100/?id=FT26063D7W5C11294152"
  }'`,

    javascript: `const baseUrl = (process.env.NEXT_PUBLIC_BACKEND_URL || "").replace(/\\/+$/, "");
const url = \`\${baseUrl}/api/transaction-create\`;

const payload = {
  full_name: "MULUGETA KASSAW CLEANING SERVICE",
  price_amount: "4000",
  platform: "cbe",
  currency: "ETB",
  transaction_id: "https://apps.cbe.com.et:100/?id=FT26063D7W5C11294152",
};

const response = await fetch(url, {
  method: "POST",
  headers: {
    Authorization: "Bearer YOUR_PROJECT_API_KEY",
    "Content-Type": "application/json",
  },
  body: JSON.stringify(payload),
});

const result = await response.json();
console.log(result);`,

    python: `import os
import requests

base_url = os.environ["NEXT_PUBLIC_BACKEND_URL"].rstrip("/")
url = f"{base_url}/api/transaction-create"

payload = {
    "full_name": "MULUGETA KASSAW CLEANING SERVICE",
    "price_amount": "4000",
    "platform": "cbe",
    "currency": "ETB",
    "transaction_id": "https://apps.cbe.com.et:100/?id=FT26063D7W5C11294152",
}

headers = {
    "Authorization": "Bearer YOUR_PROJECT_API_KEY",
    "Content-Type": "application/json",
}

response = requests.post(url, json=payload, headers=headers)
print(response.json())`,

    go: `package main

import (
	"bytes"
	"fmt"
	"io"
	"net/http"
	"os"
	"strings"
)

func main() {
	baseURL := strings.TrimRight(os.Getenv("NEXT_PUBLIC_BACKEND_URL"), "/")
	url := baseURL + "/api/transaction-create"

	payload := []byte(\`{
		"full_name": "MULUGETA KASSAW CLEANING SERVICE",
		"price_amount": "4000",
		"platform": "cbe",
		"currency": "ETB",
		"transaction_id": "https://apps.cbe.com.et:100/?id=FT26063D7W5C11294152"
	}\`)

	req, _ := http.NewRequest("POST", url, bytes.NewBuffer(payload))
	req.Header.Set("Authorization", "Bearer YOUR_PROJECT_API_KEY")
	req.Header.Set("Content-Type", "application/json")

	res, _ := http.DefaultClient.Do(req)
	defer res.Body.Close()

	body, _ := io.ReadAll(res.Body)
	fmt.Println(string(body))
}`,
};

export const receiptIntegrationPayloads = {
    curl: `curl -X POST "${TRANSACTION_CREATE_ENDPOINT}" \\
  -H "Authorization: Bearer YOUR_PROJECT_API_KEY" \\
  -F "full_name=JOHN DOE ENTERPRISE" \\
  -F "currency=ETB" \\
  -F "platform=AWASH" \\
  -F "price_amount=1050" \\
  -F "receipt_image=@/path/to/bank-receipt.png"`,

    javascript: `const baseUrl = (process.env.NEXT_PUBLIC_BACKEND_URL || "").replace(/\\/+$/, "");
const url = \`\${baseUrl}/api/transaction-create\`;

// Use FormData for receipt image uploads
const formData = new FormData();
formData.append("full_name", "JOHN DOE ENTERPRISE");
formData.append("currency", "ETB");
formData.append("platform", "AWASH");
formData.append("price_amount", "1050");
formData.append("receipt_image", receiptFile); // File or Blob from <input type="file" />

// Do NOT set the Content-Type header manually;
// the browser generates the multipart/form-data boundary automatically.
const response = await fetch(url, {
  method: "POST",
  headers: {
    Authorization: "Bearer YOUR_PROJECT_API_KEY",
  },
  body: formData,
});

const result = await response.json();
console.log(result);`,

    python: `import os
import requests

base_url = os.environ["NEXT_PUBLIC_BACKEND_URL"].rstrip("/")
url = f"{base_url}/api/transaction-create"

data = {
    "full_name": "JOHN DOE ENTERPRISE",
    "currency": "ETB",
    "platform": "AWASH",
    "price_amount": "1050",
}

headers = {
    "Authorization": "Bearer YOUR_PROJECT_API_KEY",
}

with open("bank-receipt.png", "rb") as receipt_file:
    files = {"receipt_image": ("bank-receipt.png", receipt_file, "image/png")}
    response = requests.post(url, data=data, files=files, headers=headers)

print(response.json())`,
};
