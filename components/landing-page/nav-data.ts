export interface NavDropdownItem {
    label: string;
    description: string;
    href: string;
}

export const productItems: NavDropdownItem[] = [
    {
        label: "Verification Console",
        description: "Inspect transactions, QR receipts, and audit trails.",
        href: "/#product-showcase",
    },
    {
        label: "Supported Banks",
        description: "CBE, Awash Bank, and Bank of Abyssinia adapters.",
        href: "/#bank-infrastructure",
    },
    {
        label: "How It Works",
        description: "QR receipt extraction and direct link verification.",
        href: "/#how-it-works",
    },
    {
        label: "Security & Reliability",
        description: "Duplicate protection and YP error taxonomy.",
        href: "/#security",
    },
];

export const developerItems: NavDropdownItem[] = [
    {
        label: "API Documentation",
        description: "Endpoints, headers, FormData, and JSON schemas.",
        href: "/documentation",
    },
    {
        label: "Error Codes Reference",
        description: "Standardized YP_* client, application, and server codes.",
        href: "/documentation#error-codes",
    },
    {
        label: "Integration Examples",
        description: "cURL, JavaScript, Python, and Go snippets.",
        href: "/#developers",
    },
    {
        label: "Engineering Blog",
        description: "Architecture notes and platform updates.",
        href: "/blog",
    },
];

