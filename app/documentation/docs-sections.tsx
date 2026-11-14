"use client";

import { useState } from "react";
import DocsIntroAuth from "./sections/docs-intro-auth";
import DocsVerificationMethods from "./sections/docs-verification-methods";
import DocsCodeExamples from "./sections/docs-code-examples";
import DocsResponsesErrors from "./sections/docs-responses-errors";

export default function DocsSections() {
    const [copiedCode, setCopiedCode] = useState<string | null>(null);

    const handleCopy = (text: string, id: string) => {
        navigator.clipboard.writeText(text);
        setCopiedCode(id);
        setTimeout(() => setCopiedCode(null), 2000);
    };

    return (
        <div className="space-y-20">
            <DocsIntroAuth copiedCode={copiedCode} onCopy={handleCopy} />
            <DocsVerificationMethods copiedCode={copiedCode} onCopy={handleCopy} />
            <DocsCodeExamples copiedCode={copiedCode} onCopy={handleCopy} />
            <DocsResponsesErrors />
        </div>
    );
}
