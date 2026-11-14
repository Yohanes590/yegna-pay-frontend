import { buildBackendEndpointUrl } from "@/lib/backend-url";

const endpointUrl = buildBackendEndpointUrl("/api/transaction-create");

export const requestSnippets = {
    curl: `curl -X POST "${endpointUrl}" \\
  -H "Authorization: Bearer YOUR_PROJECT_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "full_name": "MULUGETA KASSAW CLEANING SERVICE",
    "price_amount": "4000",
    "platform": "cbe",
    "currency": "ETB",
    "transaction_id": "https://apps.cbe.com.et:100/?id=FT26063D7W5C11294152"
  }'`,

    node: `const baseUrl = (process.env.NEXT_PUBLIC_BACKEND_URL || "").replace(/\\/+$/, "");

const verifyPayment = async () => {
  const response = await fetch(\`\${baseUrl}/api/transaction-create\`, {
    method: "POST",
    headers: {
      Authorization: \`Bearer \${process.env.YEGNA_PAY_SECRET_KEY}\`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      full_name: "MULUGETA KASSAW CLEANING SERVICE",
      price_amount: "4000",
      platform: "cbe",
      currency: "ETB",
      transaction_id: "https://apps.cbe.com.et:100/?id=FT26063D7W5C11294152",
    }),
  });

  const data = await response.json();
  if (data.success && data.transaction_status === "VERIFIED") {
    console.log("Payment verified: ETB", data.data.transaction_amount);
  }
};`,

    python: `import os
import requests

base_url = os.environ["NEXT_PUBLIC_BACKEND_URL"].rstrip("/")
response = requests.post(
    f"{base_url}/api/transaction-create",
    headers={
        "Authorization": f"Bearer {os.getenv('YEGNA_PAY_SECRET_KEY')}",
        "Content-Type": "application/json",
    },
    json={
        "full_name": "MULUGETA KASSAW CLEANING SERVICE",
        "price_amount": "4000",
        "platform": "cbe",
        "currency": "ETB",
        "transaction_id": "https://apps.cbe.com.et:100/?id=FT26063D7W5C11294152",
    },
)

result = response.json()
if result.get("success") and result.get("transaction_status") == "VERIFIED":
    print(f"Verified payment: {result['data']['transaction_amount']} ETB")`,

    go: `package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"strings"
)

func main() {
	baseURL := strings.TrimRight(os.Getenv("NEXT_PUBLIC_BACKEND_URL"), "/")
	payload, _ := json.Marshal(map[string]string{
		"full_name":      "MULUGETA KASSAW CLEANING SERVICE",
		"price_amount":   "4000",
		"platform":       "cbe",
		"currency":       "ETB",
		"transaction_id": "https://apps.cbe.com.et:100/?id=FT26063D7W5C11294152",
	})

	req, _ := http.NewRequest("POST", baseURL+"/api/transaction-create", bytes.NewBuffer(payload))
	req.Header.Set("Authorization", "Bearer "+os.Getenv("YEGNA_PAY_SECRET_KEY"))
	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{}
	resp, _ := client.Do(req)
	defer resp.Body.Close()
	fmt.Printf("HTTP Status: %s\\n", resp.Status)
}`,
};

export const responseSnippet = `HTTP/1.1 200 OK
Content-Type: application/json

{
  "status": 200,
  "success": true,
  "transaction_status": "VERIFIED",
  "message": "Transaction Verified Successfully",
  "data": {
    "transaction_id": "FT26063D7W5C11294152",
    "transaction_amount": 4000,
    "created_at": 12,
    "method": "CBE",
    "status": "verified",
    "from": "payer name",
    "to": "MULUGETA KASSAW CLEANING SERVICE",
    "currency": "ETB",
    "risk_score": 98
  }
}`;

export const webhookSnippet = `POST https://yourapp.com/api/webhooks/yegnapay
Content-Type: application/json

{
  "transaction_id": "FT26063D7W5C11294152",
  "transaction_amount": 4000,
  "created_at": 12,
  "method": "CBE",
  "status": "verified",
  "from": "payer name",
  "to": "MULUGETA KASSAW CLEANING SERVICE",
  "currency": "ETB",
  "risk_score": 98
}`;
