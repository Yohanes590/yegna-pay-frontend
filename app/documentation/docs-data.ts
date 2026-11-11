export const docSections = [
    { id: "introduction", label: "Introduction" },
    { id: "authentication", label: "Authentication" },
    { id: "endpoint", label: "API Endpoint" },
    { id: "parameters", label: "Parameters Schema" },
    { id: "examples", label: "Request Examples" },
    { id: "integration", label: "How to Send Requests" },
    { id: "expected-response", label: "Expected Response" },
    { id: "pipeline", label: "Verification Pipeline" },
    { id: "best-practices", label: "Best Practices" },
];

export const bankPayloads = {
    boa: `{\n  "full_name": "JOHN DOE ENTERPRISE",\n  "price_amount": "4000",\n  "platform": "BOA",\n  "currency": "ETB",\n  "transaction_id": "FT23123456..."\n}`,
    cbe: `{\n  "full_name": "JOHN DOE ENTERPRISE",\n  "price_amount": "4000",\n  "platform": "CBE",\n  "currency": "ETB",\n  "transaction_id": "FT26133F833J..."\n}`,
    awash: `{\n  "full_name": "JOHN DOE ENTERPRISE",\n  "price_amount": "4000",\n  "platform": "AWASH",\n  "currency": "ETB",\n  "transaction_id": "-2KCLVVWOY3-4R..."\n}`,
};

export const integrationPayloads: Record<string, string> = {
    javascript: `const url = 'https://yegna-pay.vercel.app/api/transaction-create';
const token = 'sk_live_...';

const payload = {
  full_name: "MULUGETA KASSAW CLEANING SERVICE",
  price_amount: "4000",
  platform: "awash",
  currency: "ETB",
  transaction_id: "-2KCLVVWOY3-67..."
};

fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': \`Bearer \${token}\`
  },
  body: JSON.stringify(payload)
})
.then(res => res.json())
.then(data => console.log(data));`,

    python: `import requests

url = "https://yegna-pay.vercel.app/api/transaction-create"
headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer sk_live_..."
}
payload = {
    "full_name": "MULUGETA KASSAW CLEANING SERVICE",
    "price_amount": "4000",
    "platform": "awash",
    "currency": "ETB",
    "transaction_id": "-2KCLVVWOY3-67..."
}

response = requests.post(url, json=payload, headers=headers)
print(response.json())`,

    go: `package main

import (
	"bytes"
	"fmt"
	"io/ioutil"
	"net/http"
)

func main() {
	url := "https://yegna-pay.vercel.app/api/transaction-create"
	payload := []byte(\`{
      "full_name": "MULUGETA KASSAW CLEANING SERVICE",
      "price_amount": "4000",
      "platform": "awash",
      "currency": "ETB",
      "transaction_id": "-2KCLVVWOY3-67..."
    }\`)

	req, _ := http.NewRequest("POST", url, bytes.NewBuffer(payload))
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", "Bearer sk_live_...")

	client := &http.Client{}
	resp, _ := client.Do(req)
	defer resp.Body.Close()

	body, _ := ioutil.ReadAll(resp.Body)
	fmt.Println(string(body))
}`,
};

