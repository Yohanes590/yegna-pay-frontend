export interface BankNode {
    id: string;
    name: string;
    shortName: string;
    logo: string;
    isSvg?: boolean;
    railType: string;
    latency: string;
    protocol: string;
    hashFormat: string;
    status: "Operational" | "Optimal";
    technicalSpecs: string[];
}

export const bankNodes: BankNode[] = [
    {
        id: "cbe",
        name: "Commercial Bank of Ethiopia",
        shortName: "CBE",
        logo: "/banks/CBE.png",
        railType: "National Central Rail",
        latency: "165ms",
        protocol: "CBE Direct Core Ledger / Telebirr Interconnect",
        hashFormat: "FT26... (12 Alphanumeric)",
        status: "Optimal",
        technicalSpecs: [
            "Direct ledger confirmation without receipt OCR latency",
            "Automated CBE Birr and mobile banking verification",
            "Replay protection caching for every verified transaction ID",
            "Sub-second status return with 99.98% match precision",
        ],
    },
    {
        id: "awash",
        name: "Awash Bank",
        shortName: "AWASH",
        logo: "/banks/awash.png",
        railType: "Private Commercial Rail",
        latency: "180ms",
        protocol: "Awash Direct Clearing Gateway",
        hashFormat: "-2KC... (Standard Core Token)",
        status: "Operational",
        technicalSpecs: [
            "Full account number and payer name verification",
            "High-throughput concurrent API query support",
            "Exact decimal amount validation (ETB currency lock)",
            "Cryptographic HMAC webhook callback upon settlement",
        ],
    },
    {
        id: "abyssinia",
        name: "Bank of Abyssinia",
        shortName: "ABYSSINIA",
        logo: "/banks/abs.png",
        railType: "Digital Banking Rail",
        latency: "172ms",
        protocol: "BOA Virtual Ledger Adapter",
        hashFormat: "BOA... (Native Banking Digest)",
        status: "Optimal",
        technicalSpecs: [
            "Synchronous verification for digital banking transfers",
            "Real-time duplicate submission prevention",
            "Zero manual slip inspection required",
            "Continuous automated health telemetry check every 60s",
        ],
    },
    {
        id: "boa",
        name: "Bank of Africa",
        shortName: "BOA-GROUP",
        logo: "/banks/boa.svg",
        isSvg: true,
        railType: "Pan-African Financial Rail",
        latency: "210ms",
        protocol: "BOA Enterprise Institutional Rail",
        hashFormat: "AFR... (Institutional Clearing Token)",
        status: "Operational",
        technicalSpecs: [
            "Enterprise and institutional transfer reconciliation",
            "Bulk transaction verification pipeline",
            "Multi-account merchant routing verification",
            "Standardized Yegna Pay unified JSON schema",
        ],
    },
];

