"use client"
import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
    ShieldAlert, Terminal, CheckCircle2, Copy, Layers,
    FileText, UserCheck, Calendar,
    Search, CopyCheck, ArrowLeft,
    Info
} from 'lucide-react';

const CodeBlock: React.FC<{ code: string; language: string }> = ({ code, language }) => {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="relative group rounded-xl border border-[#1E293B] bg-[#020617] font-mono text-sm leading-relaxed overflow-hidden my-6 shadow-md">
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#1E293B] bg-[#0F172A] text-xs text-[#64748B]">
                <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <div className="w-3 h-3 rounded-full bg-[#10B981]/80" />
                </div>
                <div className="flex items-center gap-4">
                    <span className="uppercase tracking-wider font-bold">{language}</span>
                    <button
                        onClick={copyToClipboard}
                        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#1E293B] hover:bg-[#334155] text-[#94A3B8] hover:text-[#F8FAFC] transition-colors"
                    >
                        {copied ? <CopyCheck size={14} className="text-[#10B981]" /> : <Copy size={14} />}
                        {copied ? 'Copied' : 'Copy Code'}
                    </button>
                </div>
            </div>
            <pre className="p-6 overflow-x-auto text-[#F8FAFC] text-[13px]">
                <code>{code}</code>
            </pre>
        </div>
    );
};

// --- Page Content ---
export default function YegnaPayDocs() {
    const [activeSection, setActiveSection] = useState('introduction');
    const [activeRequestTab, setActiveRequestTab] = useState<'fetch' | 'json'>('fetch');
    const [activeBankTab, setActiveBankTab] = useState<'boa' | 'cbe' | 'awash'>('cbe');
    const [activeLangTab, setActiveLangTab] = useState<'javascript' | 'typescript' | 'python' | 'php' | 'java' | 'cpp' | 'go'>('javascript');
    const [searchQuery, setSearchQuery] = useState('');

    const sections = [
        { id: 'introduction', label: 'Introduction' },
        { id: 'authentication', label: 'Authentication' },
        { id: 'endpoint', label: 'API Endpoint' },
        { id: 'parameters', label: 'Parameters Schema' },
        { id: 'examples', label: 'Request Examples' },
        { id: 'integration', label: 'How to Send Requests' },
        { id: 'expected-response', label: 'Expected Response' },
        { id: 'pipeline', label: 'Verification Pipeline' },
        { id: 'best-practices', label: 'Best Practices' },
    ];

    const filteredSections = useMemo(() => {
        if (!searchQuery) return sections;
        return sections.filter(section =>
            section.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
            section.id.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [searchQuery]);

    // Scroll Spy Effect
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + 120;

            if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 10) {
                setActiveSection(sections[sections.length - 1].id);
                return;
            }

            for (let i = sections.length - 1; i >= 0; i--) {
                const element = document.getElementById(sections[i].id);
                if (element && element.offsetTop <= scrollPosition) {
                    setActiveSection(sections[i].id);
                    break;
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            window.scrollTo({
                top: element.offsetTop - 100,
                behavior: 'smooth'
            });
            setActiveSection(id);
        }
    };

    const bankPayloads = {
        boa: `{\n  "full_name": "JOHN DOE ENTERPRISE",\n  "price_amount": "4000",\n  "platform": "CBE",\n  "currency": "ETB",\n  "transaction_id": "FT23123456..."\n}`,
        cbe: `{\n  "full_name": "JOHN DOE ENTERPRISE",\n  "price_amount": "4000",\n  "platform": "awash",\n  "currency": "ETB",\n  "transaction_id": "-2KCLVVWOY3-4R..."\n}`,
        awash: `{\n  "full_name": "JOHN DOE ENTERPRISE",\n  "price_amount": "4000",\n  "platform": "BOA",\n  "currency": "ETB",\n  "transaction_id": "FT26133F833J..."\n}`
    };

    const bankLogos = {
        boa: '/banks/abs.png',
        cbe: '/banks/CBE.png',
        awash: '/banks/awash.png'
    };

    const integrationPayloads = {
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
.then(data => console.log(data))
.catch(err => console.error(err));`,

        typescript: `interface TransactionPayload {
  full_name: string;
  price_amount: string;
  platform: string;
  currency: string;
  transaction_id: string;
}

const url = 'https://yegna-pay.vercel.app/api/transaction-create';
const token = 'sk_live_...';

const payload: TransactionPayload = {
  full_name: "MULUGETA KASSAW CLEANING SERVICE",
  price_amount: "4000",
  platform: "awash",
  currency: "ETB",
  transaction_id: "--2KCLVVWOY3-67..."
};

async function createTransaction() {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': \`Bearer \${token}\`
      },
      body: JSON.stringify(payload)
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}`,

        python: `import requests

url = "https://yegna-pay.vercel.app/api/transaction-create"

payload = {
  "full_name": "MULUGETA KASSAW CLEANING SERVICE",
  "price_amount": "4000",
  "platform": "awash",
  "currency": "ETB",
  "transaction_id": "-2KCLVVWOY3-67..."
}

headers = {
  "Content-Type": "application/json",
  "Authorization": "Bearer sk_live_..."
}

response = requests.post(url, json=payload, headers=headers)
print(response.json())`,

        php: `<?php
$url = "https://yegna-pay.vercel.app/api/transaction-create";

$payload = json_encode(array(
  "full_name" => "MULUGETA KASSAW CLEANING SERVICE",
  "price_amount" => "4000",
  "platform" => "awash",
  "currency" => "ETB",
  "transaction_id" => "-2KCLVVWOY3-67..."
));

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    "Content-Type: application/json",
    "Authorization: Bearer sk_live_..."
));
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);

$response = curl_exec($ch);
curl_close($ch);

echo $response;
?>`,

        java: `import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class Main {
    public static void main(String[] args) throws Exception {
        String payload = """
            {
              "full_name": "MULUGETA KASSAW CLEANING SERVICE",
              "price_amount": "4000",
              "platform": "awash",
              "currency": "ETB",
              "transaction_id": "-2KCLVVWOY3-67..."
            }
            """;

        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create("https://yegna-pay.vercel.app/api/transaction-create"))
            .header("Content-Type", "application/json")
            .header("Authorization", "Bearer sk_live_...")
            .POST(HttpRequest.BodyPublishers.ofString(payload))
            .build();

        HttpClient client = HttpClient.newHttpClient();
        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

        System.out.println(response.body());
    }
}`,

        cpp: `#include <iostream>
#include <string>
#include <curl/curl.h>

int main() {
    CURL *curl;
    CURLcode res;

    curl_global_init(CURL_GLOBAL_ALL);
    curl = curl_easy_init();
    
    if(curl) {
        struct curl_slist *headers = NULL;
        headers = curl_slist_append(headers, "Content-Type: application/json");
        headers = curl_slist_append(headers, "Authorization: Bearer sk_live_...");

        std::string payload = R"({"full_name":"MULUGETA KASSAW CLEANING SERVICE","price_amount":"4000","platform":"awash","currency":"ETB","transaction_id":"-2KCLVVWOY3-67..."})";

        curl_easy_setopt(curl, CURLOPT_URL, "https://yegna-pay.vercel.app/api/transaction-create");
        curl_easy_setopt(curl, CURLOPT_HTTPHEADER, headers);
        curl_easy_setopt(curl, CURLOPT_POSTFIELDS, payload.c_str());

        res = curl_easy_perform(curl);
        
        curl_slist_free_all(headers);
        curl_easy_cleanup(curl);
    }
    curl_global_cleanup();
    return 0;
}`,

        go: `package main

import (
    "bytes"
    "fmt"
    "net/http"
    "io/ioutil"
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
}`
    };

    return (
        <div className="min-h-screen bg-[#020617] text-[#F8FAFC] font-sans selection:bg-[#10B981]/30 selection:text-[#34D399]">

            {/* Top Navigation */}
            <header className="fixed top-0 left-0 right-0 h-16 bg-[#020617]/80 backdrop-blur-xl border-b border-[#1E293B] z-50 flex items-center justify-between px-6">
                <div className="flex items-center gap-6">
                    <Link href="/" className="flex items-center gap-2 group cursor-pointer text-[#94A3B8] hover:text-[#F8FAFC] transition-colors">
                        <ArrowLeft size={16} />
                        <span className="font-semibold text-sm">Back to Home</span>
                    </Link>
                    <div className="h-4 w-px bg-[#1E293B]" />
                    <span className="font-bold text-[#F8FAFC] flex items-center gap-2 relative">
                        <div className="w-full p-[10px] cursor-default bg-[#10B981] rounded flex items-center justify-center shadow-[0_0_10px_rgba(16,185,129,0.3)]">
                            <span className="text-[#020617] font-black text-[10px]">Yegna Pay</span>
                        </div>
                        Documentation
                    </span>
                </div>
                <div className="flex items-center gap-4">
                    <div className="hidden md:flex items-center gap-2 bg-[#0F172A] border border-[#1E293B] rounded-lg px-3 py-1.5 text-[#64748B] focus-within:border-[#10B981]/50 focus-within:ring-2 focus-within:ring-[#10B981]/20 transition-all">
                        <Search size={14} />
                        <input
                            type="text"
                            placeholder="Search docs..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-transparent border-none outline-none text-sm w-48 text-[#F8FAFC] placeholder:text-[#64748B]"
                        />
                    </div>
                </div>
            </header>

            <div className="max-w-[1400px] mx-auto px-4 md:px-6 pt-24 pb-20 flex justify-between">

                {/* Left Sidebar Navigation */}
                <aside className="hidden lg:block w-[240px] shrink-0 sticky top-24 h-[calc(100vh-120px)] overflow-y-auto pb-10 scrollbar-none pr-6">
                    <div className="space-y-1">
                        <h4 className="text-[11px] font-bold text-[#64748B] uppercase tracking-widest mb-4 px-3">API Reference</h4>
                        {(searchQuery ? filteredSections : sections).map(section => (
                            <button
                                key={section.id}
                                onClick={() => scrollToSection(section.id)}
                                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all ${activeSection === section.id
                                    ? 'bg-[#10B981]/10 text-[#34D399] font-bold border border-[#10B981]/20'
                                    : 'text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#0F172A] border border-transparent'
                                    }`}
                            >
                                {section.label}
                            </button>
                        ))}
                        {searchQuery && filteredSections.length === 0 && (
                            <p className="px-3 py-2 text-xs text-[#64748B] italic">No results found...</p>
                        )}
                    </div>
                </aside>

                {/* Main Content Area */}
                <main className="w-full lg:max-w-3xl lg:px-4 flex-1 relative z-10">

                    <section id="introduction" className={`mb-20 scroll-mt-24 transition-opacity duration-300 ${searchQuery && !sections[0].label.toLowerCase().includes(searchQuery.toLowerCase()) ? 'hidden' : 'block'}`}>
                        <h1 className="text-4xl font-black text-[#F8FAFC] tracking-tight mb-4">Transaction Verification API</h1>
                        <p className="text-lg text-[#94A3B8] leading-relaxed mb-6 font-medium">
                            Automate and validate digital banking transactions inside your application pipeline.
                            The Yegna Pay verification engine protects your system against fraud, checks totals, and confirms user data instantly.
                        </p>

                        <div className="p-5 rounded-xl border border-[#fbbf24]/30 bg-[#fbbf24]/10 flex items-start gap-4">
                            <ShieldAlert className="text-[#fbbf24] shrink-0 mt-0.5" size={20} />
                            <div className="text-sm">
                                <span className="font-bold block text-[#F8FAFC] mb-1">Operational Notice</span>
                                <p className="leading-relaxed font-medium text-[#cbd5e1]">
                                    You must open a dedicated bank account specifically for payment collection. <strong>Do not use your personal or primary account.</strong> Using a dedicated account improves security, accounting accuracy, and fraud monitoring.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section id="authentication" className={`mb-20 scroll-mt-24 transition-opacity duration-300 ${searchQuery && !sections.find(s => s.id === 'authentication')?.label.toLowerCase().includes(searchQuery.toLowerCase()) ? 'hidden' : 'block'}`}>
                        <h2 className="text-2xl font-bold text-[#F8FAFC] mb-4 pb-2 border-b border-[#1E293B]">Authentication</h2>
                        <p className="mb-4 text-[#94A3B8] font-medium leading-relaxed">
                            Authenticate your API requests using Bearer tokens included in the <code className="bg-[#1E293B] px-1.5 py-0.5 rounded text-[#F8FAFC]">Authorization</code> header. You can manage your API keys from the developer dashboard.
                        </p>
                        <div className="bg-[#0F172A] border border-[#1E293B] rounded-lg p-4 font-mono text-sm inline-block shadow-sm">
                            <span className="text-[#64748B]">Authorization:</span> Bearer <span className="text-[#34D399] font-bold">sk_live_...</span>
                        </div>
                    </section>

                    <section id="endpoint" className={`mb-20 scroll-mt-24 transition-opacity duration-300 ${searchQuery && !sections.find(s => s.id === 'endpoint')?.label.toLowerCase().includes(searchQuery.toLowerCase()) ? 'hidden' : 'block'}`}>
                        <h2 className="text-2xl font-bold text-[#F8FAFC] mb-4 pb-2 border-b border-[#1E293B]">API Endpoint</h2>
                        <div className="flex items-center gap-4 bg-[#0F172A] rounded-xl p-4 border border-[#1E293B] shadow-sm">
                            <span className="px-3 py-1 rounded bg-[#38bdf8]/10 text-[#38bdf8] font-bold text-xs uppercase tracking-wider border border-[#38bdf8]/20 shrink-0">POST</span>
                            <span className="font-mono text-[#F8FAFC] text-sm select-all overflow-hidden text-ellipsis whitespace-nowrap">https://yegna-pay.vercel.app/api/transaction-create</span>
                        </div>
                    </section>

                    <section id="parameters" className={`mb-20 scroll-mt-24 transition-opacity duration-300 ${searchQuery && !sections.find(s => s.id === 'parameters')?.label.toLowerCase().includes(searchQuery.toLowerCase()) ? 'hidden' : 'block'}`}>
                        <h2 className="text-2xl font-bold text-[#F8FAFC] mb-4 pb-2 border-b border-[#1E293B]">Parameters Schema</h2>
                        <div className="rounded-xl border border-[#1E293B] overflow-hidden divide-y divide-[#1E293B] bg-[#0F172A] shadow-sm">
                            {[
                                { name: "full_name", type: "string", req: true, desc: "Sender or Payer's official Full Name as recorded on the platform receipt." },
                                { name: "price_amount", type: "string", req: true, desc: "The exact payment value being requested or processed." },
                                { name: "platform", type: "string", req: true, desc: "The banking platform ('awash', 'CBE', 'BOA')." },
                                { name: "currency", type: "string", req: true, desc: "Standard currency code system identifier (e.g., 'ETB')." },
                                { name: "transaction_id", type: "string", req: true, desc: "The unique system-assigned transaction tracking reference key." }
                            ].map(param => (
                                <div key={param.name} className="p-5 flex flex-col md:flex-row md:items-start gap-4 hover:bg-[#1E293B]/30 transition-colors">
                                    <div className="w-full md:w-1/3">
                                        <div className="font-mono text-sm text-[#F8FAFC] font-bold">{param.name}</div>
                                        <div className="flex items-center gap-2 mt-2">
                                            <span className="text-[10px] font-mono px-2 py-1 rounded bg-[#1E293B] text-[#94A3B8] font-bold">{param.type}</span>
                                            {param.req && <span className="text-[9px] px-2 py-1 rounded bg-rose-500/10 text-rose-400 uppercase tracking-widest font-bold border border-rose-500/20">Required</span>}
                                        </div>
                                    </div>
                                    <div className="w-full md:w-2/3 text-sm text-[#94A3B8] leading-relaxed font-medium">
                                        {param.desc}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section id="examples" className={`mb-20 scroll-mt-24 transition-opacity duration-300 ${searchQuery && !sections.find(s => s.id === 'examples')?.label.toLowerCase().includes(searchQuery.toLowerCase()) ? 'hidden' : 'block'}`}>
                        <h2 className="text-2xl font-bold text-[#F8FAFC] mb-4 pb-2 border-b border-[#1E293B]">Request Examples</h2>

                        <div className="rounded-xl border border-[#1E293B] bg-[#0F172A] p-6 mb-6 shadow-sm">
                            <div className="flex flex-wrap gap-2 mb-6 border-b border-[#1E293B] pb-4">
                                {['boa', 'cbe', 'awash'].map((bank) => (
                                    <button
                                        key={bank}
                                        onClick={() => setActiveBankTab(bank as any)}
                                        className={`px-4 py-2 rounded-lg text-[13px] font-bold uppercase tracking-wider transition-all ${activeBankTab === bank
                                            ? 'bg-[#10B981] text-[#020617] shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                                            : 'bg-[#020617] border border-[#1E293B] text-[#94A3B8] hover:bg-[#1E293B] hover:text-[#F8FAFC] shadow-sm'
                                            }`}
                                    >
                                        {bank}
                                    </button>
                                ))}
                            </div>

                            <div className="flex items-center gap-3 mb-2">
                                <div className="h-8 w-12 rounded bg-[#020617] border border-[#1E293B] flex items-center justify-center p-1.5 shadow-sm">
                                    <img src={bankLogos[activeBankTab]} alt={activeBankTab} className="max-h-full max-w-full object-contain" />
                                </div>
                                <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-widest">
                                    Mock Payload Data
                                </span>
                            </div>

                            <CodeBlock code={bankPayloads[activeBankTab]} language="json" />
                        </div>
                    </section>

                    <section id="integration" className={`mb-20 scroll-mt-24 transition-opacity duration-300 ${searchQuery && !sections.find(s => s.id === 'integration')?.label.toLowerCase().includes(searchQuery.toLowerCase()) ? 'hidden' : 'block'}`}>
                        <h2 className="text-2xl font-bold text-[#F8FAFC] mb-4 pb-2 border-b border-[#1E293B]">How to Send Requests</h2>
                        <p className="mb-4 text-[#94A3B8] font-medium leading-relaxed">
                            Integrate Yegna Pay effortlessly. Copy the ready-to-use snippets below to implement the transaction <code>POST</code> request in your preferred programming language.
                        </p>

                        <div className="rounded-xl border border-[#1E293B] bg-[#0F172A] pt-4 shadow-sm overflow-hidden mb-6">
                            <div className="flex flex-wrap gap-1 px-4 border-b border-[#1E293B] pb-3 overflow-x-auto scrollbar-none">
                                {[
                                    { id: 'javascript', label: 'JavaScript' },
                                    { id: 'typescript', label: 'TypeScript' },
                                    { id: 'python', label: 'Python' },
                                    { id: 'php', label: 'PHP' },
                                    { id: 'java', label: 'Java' },
                                    { id: 'cpp', label: 'C++' },
                                    { id: 'go', label: 'Go' }
                                ].map((lang) => (
                                    <button
                                        key={lang.id}
                                        onClick={() => setActiveLangTab(lang.id as any)}
                                        className={`px-3 py-1.5 rounded-lg text-xs font-bold tracking-wide transition-all whitespace-nowrap ${activeLangTab === lang.id
                                            ? 'bg-[#10B981]/15 text-[#34D399]'
                                            : 'text-[#64748B] hover:bg-[#1E293B] hover:text-[#94A3B8]'
                                            }`}
                                    >
                                        {lang.label}
                                    </button>
                                ))}
                            </div>

                            <div className="p-4 bg-[#0A0F1C]">
                                <CodeBlock code={integrationPayloads[activeLangTab]} language={activeLangTab} />
                            </div>
                        </div>
                    </section>

                    <section id="expected-response" className={`mb-20 scroll-mt-24 transition-opacity duration-300 ${searchQuery && !sections.find(s => s.id === 'expected-response')?.label.toLowerCase().includes(searchQuery.toLowerCase()) ? 'hidden' : 'block'}`}>
                        <h2 className="text-2xl font-bold text-[#F8FAFC] mb-4 pb-2 border-b border-[#1E293B]">Expected Response</h2>
                        <p className="mb-4 text-[#94A3B8] font-medium leading-relaxed">
                            Upon a successful verification query, the Yegna Pay API will respond with a JSON payload validating the status and extracted payment amount.
                        </p>
                        <div className="rounded-xl border border-[#1E293B] bg-[#0F172A] p-2 shadow-sm">
                            <CodeBlock
                                language="json"
                                code={`{\n  "success": true,\n  "data": {\n    "verified": true,\n    "amount": 4000,\n    "platform": "awash",\n    "transaction_id": "-2KCLVVWOY3-4R75E0",\n    "timestamp": "2026-06-12T01:17:00Z"\n  }\n}`}
                            />
                        </div>
                    </section>

                    <section id="pipeline" className={`mb-20 scroll-mt-24 transition-opacity duration-300 ${searchQuery && !sections.find(s => s.id === 'pipeline')?.label.toLowerCase().includes(searchQuery.toLowerCase()) ? 'hidden' : 'block'}`}>
                        <h2 className="text-2xl font-bold text-[#F8FAFC] mb-6 pb-2 border-b border-[#1E293B]">The Verification Pipeline</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {[
                                { icon: Layers, t: "Duplicate Checks", d: "Stops replay attacks and dual-submissions." },
                                { icon: FileText, t: "Optical Parsing", d: "Extracts deep metadata from receipts." },
                                { icon: UserCheck, t: "Name Verification", d: "Evaluates payer registry match." },
                                { icon: Calendar, t: "Date Validation", d: "Rejects stale or delayed transfers." }
                            ].map((item, idx) => {
                                const Icon = item.icon;
                                return (
                                    <div key={idx} className="p-6 rounded-2xl bg-[#0F172A] border border-[#1E293B] shadow-sm">
                                        <div className="w-10 h-10 rounded-xl bg-[#10B981]/10 flex items-center justify-center text-[#34D399] mb-4 border border-[#10B981]/20">
                                            <Icon size={20} />
                                        </div>
                                        <h4 className="text-[#F8FAFC] font-bold mb-2">{item.t}</h4>
                                        <p className="text-sm text-[#94A3B8] font-medium">{item.d}</p>
                                    </div>
                                )
                            })}
                        </div>
                    </section>

                    <section id="best-practices" className={`mb-20 scroll-mt-24 transition-opacity duration-300 ${searchQuery && !sections.find(s => s.id === 'best-practices')?.label.toLowerCase().includes(searchQuery.toLowerCase()) ? 'hidden' : 'block'}`}>
                        <h2 className="text-2xl font-bold text-[#F8FAFC] mb-6 pb-2 border-b border-[#1E293B]">Best Practices</h2>
                        <div className="space-y-4">
                            {[
                                "Always verify transactions server-side; never trust client UI variables.",
                                "Store immutable verification responses inside historical log archives.",
                                "Inject API secret tokens purely through protected environment variables.",
                                "Enforce active HTTPS encrypted communication layers on all endpoints."
                            ].map((text, idx) => (
                                <div key={idx} className="flex flex-start gap-4 p-5 rounded-xl border border-[#1E293B] bg-[#0F172A] shadow-sm">
                                    <CheckCircle2 size={20} className="text-[#10B981] shrink-0" />
                                    <span className="text-[#cbd5e1] text-sm leading-relaxed font-medium">{text}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    {searchQuery && filteredSections.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <Info size={48} className="text-[#64748B] mb-4" />
                            <h3 className="text-xl font-bold text-[#F8FAFC] mb-2">No matching documentation</h3>
                            <p className="text-[#94A3B8]">Try searching for different keywords or browse the sidebar.</p>
                            <button
                                onClick={() => setSearchQuery('')}
                                className="mt-6 text-[#34D399] font-bold hover:underline"
                            >
                                Clear search
                            </button>
                        </div>
                    )}

                </main>

                {/* Right Interactive Code Side Panel */}
                <aside className="hidden xl:block w-[420px] shrink-0 sticky top-24 h-[calc(100vh-120px)]">
                    <div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl p-6 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.8)] relative overflow-y-auto h-full group pb-8 scrollbar-none">

                        <div className="flex items-center justify-between mb-6 relative z-10">
                            <div className="flex items-center gap-2">
                                <Terminal size={16} className="text-[#34D399]" />
                                <span className="text-[11px] font-bold uppercase tracking-widest text-[#94A3B8]">Live Request Mode</span>
                            </div>
                            <div className="flex bg-[#020617] p-1 rounded-lg border border-[#1E293B]">
                                <button
                                    onClick={() => setActiveRequestTab('fetch')}
                                    className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-md transition-all ${activeRequestTab === 'fetch' ? 'bg-[#1E293B] text-[#F8FAFC] shadow-sm' : 'text-[#64748B] hover:text-[#F8FAFC]'}`}
                                >Fetch</button>
                                <button
                                    onClick={() => setActiveRequestTab('json')}
                                    className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-md transition-all ${activeRequestTab === 'json' ? 'bg-[#1E293B] text-[#F8FAFC] shadow-sm' : 'text-[#64748B] hover:text-[#F8FAFC]'}`}
                                >CURL</button>
                            </div>
                        </div>

                        <div className="relative z-10 -mx-6 mb-6">
                            <div className="border-t border-[#1E293B]" />
                            {activeRequestTab === 'fetch' ? (
                                <CodeBlock
                                    language="javascript"
                                    code={`const response = await fetch(\n  "/api/transaction-create", \n  {\n    method: "POST",\n    headers: {\n      "Content-Type": "application/json",\n      "Authorization": "Bearer sk_... "\n    },\n    body: JSON.stringify({\n      platform: "CBE",\n      amount: "4000",\n      currency: "ETB",\n      transaction_id: "REF"\n    })\n  }\n);\n\nconst data = await response.json();`}
                                />
                            ) : (
                                <CodeBlock
                                    language="bash"
                                    code={`curl -X POST https://api.yegnapay... \\\n  -H "Authorization: Bearer sk_..." \\\n  -H "Content-Type: application/json" \\\n  -d '{\n    "platform": "CBE",\n    "price_amount": "4000",\n    "currency": "ETB",\n    "transaction_id": "REF123"\n  }'`}
                                />
                            )}
                        </div>

                        <div className="pt-2 relative z-10 border-t border-[#1E293B] -mx-6 px-6">
                            <span className="text-[11px] font-bold uppercase tracking-widest text-[#64748B] block mb-4 mt-4">Expected Response</span>
                            <CodeBlock
                                language="json"
                                code={`{\n  "success": true,\n  "message": "Transaction verified and saved successfully.",\n  "data": {\n    "id": "28ec00dd-7536-4a17-a621-3693e8b82cf1",\n    "transaction_id": "-2KCLVVWOY3-4R75E0",\n    "transaction_amount": "4000",\n    "created_at": "2026-06-27T13:17:25.101Z",\n    "method": "link",\n    "transaction_status": "verified",\n    "from": "DITTO TSEGAYE LEGESSE",\n    "to": "DITTO TSEGAYE LEGESSE",\n    "currency": "ETB",\n    "projectId": "b56a09cf-27b9-4fc1-b269-6e18916e3aac",\n    "risk_score": 0\n  }\n}`}
                            />
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}