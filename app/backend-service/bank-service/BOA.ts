import { chromium } from "playwright-core";
import chromiumPack from "@sparticuz/chromium";
import * as cheerio from "cheerio";

export interface BOAReceiptData {
    transferredAmount?: string;
    receiverAccount?: string;
    receiverName?: string;
    transactionDate?: string;
    transactionType?: string;
    transactionReference?: string;
    narrative?: string;
}

function parseBOAReceipt(htmlContent: string): BOAReceiptData {
    const $ = cheerio.load(htmlContent);
    const result: BOAReceiptData = {};

    const keyMapping: Record<string, keyof BOAReceiptData> = {
        "transferred amount": "transferredAmount",
        "receiver's account": "receiverAccount",
        "receiver's name": "receiverName",
        "transaction date": "transactionDate",
        "transaction type": "transactionType",
        "transaction reference": "transactionReference",
        "narrative": "narrative"
    };
    $('table tbody tr').each((_, element) => {
        const rawKey = $(element).find('td').eq(0).text().trim().toLowerCase();
        const value = $(element).find('td').eq(1).text().trim();

        if (keyMapping[rawKey]) {
            result[keyMapping[rawKey]] = value;
        }
    });

    return result;
}

export async function BOAReadingPDF(transactionData: { transaction_id: string }): Promise<BOAReceiptData> {
    const boa_link = `https://cs.bankofabyssinia.com/slip/?trx=${transactionData.transaction_id}`;

    // FIX: Removed chromiumPack.headless to resolve the ts(2339) property error
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
        await page.goto(boa_link, { waitUntil: "networkidle" });
        await page.waitForTimeout(5000);
        const html = await page.content();
        await context.close();
        const parsedData = parseBOAReceipt(html);
        return parsedData;

    } catch (error) {
        console.error("BOA Scraper failed processing transaction ID:", transactionData.transaction_id, error);
        throw error;
    } finally {
        await browser.close();
    }
}