export interface BankNode {
    id: string;
    name: string;
    shortName: string;
    logo: string;
    railType: string;
    domain: string;
    hashFormat: string;
    status: "Supported";
    technicalSpecs: string[];
}

export const bankNodes: BankNode[] = [
    {
        id: "cbe",
        name: "Commercial Bank of Ethiopia",
        shortName: "CBE",
        logo: "/banks/CBE.png",
        railType: "State Commercial Bank",
        domain: "apps.cbe.com.et",
        hashFormat: "FT... (e.g. FT26063D7W5C11294152)",
        status: "Supported",
        technicalSpecs: [
            "Direct verification via official CBE receipt URL or extracted QR link",
            "Automatic extraction of transaction reference, payer, receiver, and amount",
            "Exact decimal amount and normalized recipient name comparison",
            "Database-level duplicate transaction ID blocking (409 YP_03DeFg)",
        ],
    },
    {
        id: "awash",
        name: "Awash Bank",
        shortName: "AWASH",
        logo: "/banks/awash.png",
        railType: "Private Commercial Bank",
        domain: "awashpay.awashbank.com:8225",
        hashFormat: "AwashPay Token (e.g. -2KCLVVWOY3-4R75E0)",
        status: "Supported",
        technicalSpecs: [
            "Supports AwashPay receipt links and uploaded receipt QR images",
            "Validates bank domain, sender/receiver identity, and ETB amount",
            "Enforces project transaction eligibility start-date restrictions",
            "Triggers project webhook callback immediately after verification",
        ],
    },
    {
        id: "abyssinia",
        name: "Bank of Abyssinia",
        shortName: "BOA",
        logo: "/banks/abs.png",
        railType: "Private Commercial Bank",
        domain: "cs.bankofabyssinia.com",
        hashFormat: "BOA Slip Reference (e.g. FT23123456)",
        status: "Supported",
        technicalSpecs: [
            "Verifies Bank of Abyssinia digital slip links and QR receipt uploads",
            "Normalizes payer and recipient names before matching project rules",
            "Rejects replayed receipt references across concurrent API calls",
            "Returns unified JSON verification schema across all bank rails",
        ],
    },
];
