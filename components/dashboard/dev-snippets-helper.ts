import { buildBackendEndpointUrl } from "@/lib/backend-url";

export type DevLang = "curl" | "node" | "python";
export type VerificationMethod = "link" | "receipt";

export function getDashboardSnippets(apiKey: string, receiverName: string) {
    const endpointUrl = buildBackendEndpointUrl("/api/transaction-create");

    const linkSnippets: Record<DevLang, string> = {
        curl: `curl -X POST "${endpointUrl}" \\
  -H "Authorization: Bearer ${apiKey}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "full_name": "${receiverName}",
    "price_amount": "4000",
    "platform": "cbe",
    "currency": "ETB",
    "transaction_id": "https://apps.cbe.com.et:100/?id=FT26063D7W5C11294152"
  }'`,

        node: `const response = await fetch("${endpointUrl}", {
  method: "POST",
  headers: {
    "Authorization": "Bearer ${apiKey}",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    full_name: "${receiverName}",
    price_amount: "4000",
    platform: "cbe",
    currency: "ETB",
    transaction_id: "https://apps.cbe.com.et:100/?id=FT26063D7W5C11294152",
  }),
});

const result = await response.json();
console.log("Verification Result:", result);`,

        python: `import requests

url = "${endpointUrl}"
payload = {
    "full_name": "${receiverName}",
    "price_amount": "4000",
    "platform": "cbe",
    "currency": "ETB",
    "transaction_id": "https://apps.cbe.com.et:100/?id=FT26063D7W5C11294152"
}
headers = {
    "Authorization": "Bearer ${apiKey}",
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)
print("Verification Result:", response.json())`,
    };

    const receiptSnippets: Record<DevLang, string> = {
        curl: `curl -X POST "${endpointUrl}" \\
  -H "Authorization: Bearer ${apiKey}" \\
  -F "full_name=JOHN DOE ENTERPRISE" \\
  -F "currency=ETB" \\
  -F "platform=AWASH" \\
  -F "price_amount=1050" \\
  -F "receipt_image=@/path/to/receipt.png"`,

        node: `const formData = new FormData();
formData.append("full_name", "JOHN DOE ENTERPRISE");
formData.append("currency", "ETB");
formData.append("platform", "AWASH");
formData.append("price_amount", "1050");
formData.append("receipt_image", receiptFile);

// Omit Content-Type so the browser sets the multipart boundary
const response = await fetch("${endpointUrl}", {
  method: "POST",
  headers: {
    "Authorization": "Bearer ${apiKey}",
  },
  body: formData,
});

const result = await response.json();
console.log("Verification Result:", result);`,

        python: `import requests

url = "${endpointUrl}"
data = {
    "full_name": "JOHN DOE ENTERPRISE",
    "currency": "ETB",
    "platform": "AWASH",
    "price_amount": "1050"
}
headers = {
    "Authorization": "Bearer ${apiKey}"
}

with open("receipt.png", "rb") as receipt_file:
    files = {"receipt_image": ("receipt.png", receipt_file, "image/png")}
    response = requests.post(url, data=data, files=files, headers=headers)

print("Verification Result:", response.json())`,
    };

    return { linkSnippets, receiptSnippets };
}

export const SUPPORTED_DASHBOARD_BANKS = [
    { name: "Commercial Bank of Ethiopia (CBE)", code: "CBE", status: "Operational" },
    { name: "Awash Bank", code: "AWASH", status: "Operational" },
    { name: "Bank of Abyssinia", code: "BOA", status: "Operational" },
];

