import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/lib/theme-context";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://yegna-pay.vercel.app/"),

  title: {
    default: "Yegna Pay - Developer First Payment Verification Platform",
    template: "%s | Yegna Pay",
  },

  description:
    "Yegna Pay is Ethiopia's developer-first payment verification platform. Verify Telebirr, CBE Birr, and bank transfers with secure APIs, webhooks, fraud detection, and real-time transaction validation.",

  keywords: [
    "Yegna Pay",
    "license free payment gateway",
    "license free payment gateway in ethiopia",
    "Ethiopia payment gateway",
    "Payment verification API",
    "Telebirr verification",
    "CBE Birr API",
    "Ethiopian fintech",
    "Payment webhook",
    "Transaction verification",
    "Developer payment solution",
    "Ethiopia online payments",
    "Fraud detection",
    "Payment automation",
    "Merchant verification",
    "Payment API Ethiopia",
  ],

  authors: [
    {
      name: "Yegna Pay",
    },
  ],

  creator: "Yegna Pay",
  publisher: "Yegna Pay",

  category: "Finance",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    title: "Yegna Pay - Developer First Payment Verification Platform",
    description:
      "Automate payment verification in Ethiopia with secure APIs, webhooks, fraud prevention, and real-time transaction validation.",
    url: "https://yegna-pay.vercel.app",
    siteName: "Yegna Pay",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/assets/hero-laptop-workspace.jpg",
        width: 1200,
        height: 630,
        alt: "Yegna Pay Platform",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Yegna Pay",
    description:
      "Developer-first payment verification platform for Ethiopia.",
    images: ["/assets/hero-laptop-workspace.jpg"],
  },

  alternates: {
    canonical: "https://yegna-pay.vercel.app/",
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${poppins.className} dark h-full antialiased bg-[#060a0f]`}
    >
      <head>
        <meta name="google-site-verification" content="4OoJ6t55cvK2bVTcORgbP_2Z2tjvoIhru5DjCc0bfJY" />
      </head>
      <body
        cz-shortcut-listen="true"
        className="min-h-full flex flex-col bg-[#060a0f] text-[#F1F5F9] selection:bg-[#10B981]/25 selection:text-[#34D399]">
        <ThemeProvider>
          <Toaster />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
