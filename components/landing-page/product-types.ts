export interface Transaction {
    id: string;
    sender: string;
    amount: number;
    currency: string;
    bank: string;
    status: "verified" | "pending" | "rejected";
    timestamp: string;
    reason?: string;
    reference: string;
}

export const mockTransactions: Transaction[] = [
    {
        id: "FT26133F833J",
        sender: "ALEMU TEFERA GENERAL TRADING",
        amount: 4000.0,
        currency: "ETB",
        bank: "Commercial Bank of Ethiopia",
        status: "verified",
        timestamp: "2 mins ago",
        reference: "CBE-REF-8831920",
    },
    {
        id: "-2KCLVVWOY3-4R75E0",
        sender: "MULUGETA KASSAW SERVICES",
        amount: 12850.0,
        currency: "ETB",
        bank: "Awash Bank",
        status: "verified",
        timestamp: "7 mins ago",
        reference: "AW-CORE-092183",
    },
    {
        id: "FT90284711AA",
        sender: "BERHAN TRADING PLC",
        amount: 25000.0,
        currency: "ETB",
        bank: "Commercial Bank of Ethiopia",
        status: "pending",
        timestamp: "14 mins ago",
        reason: "Awaiting core ledger reconciliation poll",
        reference: "CBE-REF-9120481",
    },
    {
        id: "FT10492812KK",
        sender: "UNKNOWN PAYER (SMS REPLAY)",
        amount: 800.0,
        currency: "ETB",
        bank: "Commercial Bank of Ethiopia",
        status: "rejected",
        timestamp: "28 mins ago",
        reason: "Duplicate transaction hash detected: already cleared at 10:14 EAT",
        reference: "DUP-CBE-883011",
    },
    {
        id: "BOA7719284109",
        sender: "RAHEL GIRMA KEBEDE",
        amount: 750.0,
        currency: "ETB",
        bank: "Bank of Abyssinia",
        status: "verified",
        timestamp: "35 mins ago",
        reference: "BOA-TX-9938102",
    },
    {
        id: "AFR4401928301",
        sender: "AFRICA LOGISTICS CO.",
        amount: 32000.0,
        currency: "ETB",
        bank: "Bank of Africa",
        status: "verified",
        timestamp: "52 mins ago",
        reference: "BOA-INT-110293",
    },
    {
        id: "-3JNVXXW992-1B32A1",
        sender: "TAMRAT WORKU ENTERPRISE",
        amount: 1500.0,
        currency: "ETB",
        bank: "Awash Bank",
        status: "rejected",
        timestamp: "1 hour ago",
        reason: "Amount mismatch: API declared 2,000 ETB, transfer received 1,500 ETB",
        reference: "AW-MIS-772910",
    },
];

