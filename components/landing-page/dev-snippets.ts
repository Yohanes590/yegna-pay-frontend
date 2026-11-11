export const requestSnippets = {
    curl: `curl -X POST https://yegna-pay.vercel.app/api/transaction-create \\
  -H "Authorization: Bearer sk_live_89a4fe91d0b..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "full_name": "MULUGETA KASSAW CLEANING SERVICE",
    "price_amount": "4000.00",
    "platform": "AWASH",
    "currency": "ETB",
    "transaction_id": "-2KCLVVWOY3-4R75E0"
  }'`,

    node: `import axios from 'axios';

const verifyPayment = async () => {
  const { data } = await axios.post(
    'https://yegna-pay.vercel.app/api/transaction-create',
    {
      full_name: 'MULUGETA KASSAW CLEANING SERVICE',
      price_amount: '4000.00',
      platform: 'AWASH',
      currency: 'ETB',
      transaction_id: '-2KCLVVWOY3-4R75E0'
    },
    {
      headers: {
        Authorization: \`Bearer \${process.env.YEGNA_PAY_SECRET_KEY}\`,
        'Content-Type': 'application/json'
      }
    }
  );

  if (data.success && data.data.verified) {
    console.log('Payment verified: ETB', data.data.amount);
  }
};`,

    python: `import os
import requests

response = requests.post(
    "https://yegna-pay.vercel.app/api/transaction-create",
    headers={
        "Authorization": f"Bearer {os.getenv('YEGNA_PAY_SECRET_KEY')}",
        "Content-Type": "application/json"
    },
    json={
        "full_name": "MULUGETA KASSAW CLEANING SERVICE",
        "price_amount": "4000.00",
        "platform": "AWASH",
        "currency": "ETB",
        "transaction_id": "-2KCLVVWOY3-4R75E0"
    }
)

result = response.json()
if result.get("success") and result["data"]["verified"]:
    print(f"Verified payment: {result['data']['amount']} ETB")`,

    go: `package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
	"os"
)

func main() {
	payload, _ := json.Marshal(map[string]string{
		"full_name":      "MULUGETA KASSAW CLEANING SERVICE",
		"price_amount":   "4000.00",
		"platform":       "AWASH",
		"currency":       "ETB",
		"transaction_id": "-2KCLVVWOY3-4R75E0",
	})

	req, _ := http.NewRequest("POST", "https://yegna-pay.vercel.app/api/transaction-create", bytes.NewBuffer(payload))
	req.Header.Set("Authorization", "Bearer "+os.Getenv("YEGNA_PAY_SECRET_KEY"))
	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{}
	resp, _ := client.Do(req)
	defer resp.Body.Close()
	fmt.Printf("HTTP Status: %s\\n", resp.Status)
}`
};

export const responseSnippet = `HTTP/1.1 200 OK
Content-Type: application/json
X-Verification-Time: 182ms

{
  "success": true,
  "data": {
    "verified": true,
    "transaction_id": "-2KCLVVWOY3-4R75E0",
    "amount": 4000.00,
    "currency": "ETB",
    "platform": "awash",
    "payer_name": "MULUGETA KASSAW CLEANING SERVICE",
    "core_reference": "AW-CORE-092183",
    "verification_fee_etb": 0.50,
    "anti_replay_hash": "e9c20a117b884d8f89c02d129a...",
    "timestamp": "2026-11-02T11:45:12Z"
  }
}`;

export const webhookSnippet = `POST https://yourapp.com/api/webhooks/yegnapay
Content-Type: application/json
X-Yegna-Signature: sha256=4f9b2d88192837bc01...

{
  "event": "transaction.verified",
  "data": {
    "transaction_id": "-2KCLVVWOY3-4R75E0",
    "status": "VERIFIED",
    "amount": 4000.00,
    "currency": "ETB",
    "bank": "AWASH",
    "reconciliation_id": "REC-2026-9901"
  }
}`;

