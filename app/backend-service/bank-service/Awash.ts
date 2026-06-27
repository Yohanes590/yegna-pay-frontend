import { chromium } from "playwright-core";
import chromiumPack from "@sparticuz/chromium";
import * as cheerio from "cheerio";

export interface AwashReceiptData {
    transferredAmount?: string;
    receiverAccount?: string;
    receiverName?: string;
    transactionDate?: string;
    transactionType?: string;
    transactionReference?: string;
    narrative?: string;
    vat?: string;
    senderName?: string;
    beneficiaryBank?: string;
}

function parseAwashReceipt(htmlContent: string): AwashReceiptData {
    const $ = cheerio.load(htmlContent);
    const result: AwashReceiptData = {};

    const keyMapping: Record<string, keyof AwashReceiptData> = {
        "amount": "transferredAmount",
        "beneficiary account": "receiverAccount",
        "beneficiary name": "receiverName",
        "transaction time": "transactionDate",
        "transaction type": "transactionType",
        "transaction id": "transactionReference",
        "reason": "narrative",
        "vat": "vat",
        "sender name": "senderName",
        "beneficiary bank": "beneficiaryBank"
    };

    $('table tbody tr').each((_, element) => {
        const tds = $(element).find('td');

        // Skip rows that don't have enough columns
        if (tds.length < 2) return;

        // Clean up the key label
        const rawKey = tds.eq(0).text().replace(':', '').trim().toLowerCase();

        let value = '';
        // If there are 3 columns and the 2nd one is just a colon separator, grab the 3rd column
        if (tds.length >= 3 && tds.eq(1).text().trim() === ':') {
            value = tds.eq(2).text().trim();
        } else {
            // Fallback for standard 2-column layout, stripping any leading colons from the value
            value = tds.eq(1).text().trim();
            if (value.startsWith(':')) {
                value = value.substring(1).trim();
            }
        }

        if (keyMapping[rawKey]) {
            result[keyMapping[rawKey]] = value;
        }
    });

    return result;
}

export async function AwashbankReader(transactionData: { transaction_id: string }): Promise<AwashReceiptData> {
    const awashLink = `https://awashpay.awashbank.com:8225/${transactionData.transaction_id}`;

    // Configure and launch serverless-compatible Chromium
    const browser = await chromium.launch({
        args: chromiumPack.args,
        executablePath: await chromiumPack.executablePath(),
        headless: true,
    });

    try {
        const context = await browser.newContext({
            userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
        });

        const page = await context.newPage();
        await page.goto(awashLink, { waitUntil: "networkidle" });

        await page.waitForTimeout(3000);
        const html = await page.content();
        await context.close();

        return parseAwashReceipt(html);

    } catch (error) {
        console.error("Awash Scraper failed processing transaction ID:", transactionData.transaction_id, error);
        throw error;
    } finally {
        await browser.close();
    }
}