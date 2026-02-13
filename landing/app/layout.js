import { Syne, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://github.com/yash-nandvana/project-health";
const title = "check-project-health — Terminal health dashboard for developers";
const description =
  "Run one command and get a real-time health report: dependencies, git, code quality, environment, tests, and security — all in one place. npm install -g check-project-health.";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s | check-project-health",
  },
  description,
  keywords: [
    "check-project-health",
    "project health",
    "npm",
    "cli",
    "developer tools",
    "dependencies",
    "git health",
    "code quality",
    "security audit",
    "terminal",
    "health dashboard",
    "node.js",
  ],
  authors: [{ name: "Yash Nandvana", url: "https://github.com/yash-nandvana" }],
  creator: "Yash Nandvana",
  publisher: "Yash Nandvana",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "check-project-health",
    title,
    description,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "check-project-health — Terminal health dashboard for developers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/opengraph-image"],
    creator: "@yashnandvana",
    site: "@yashnandvana",
  },
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
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  category: "technology",
  classification: "Developer Tools",
  other: {
    "npm:package": "check-project-health",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
  },
  verification: {
    // Uncomment and set when you have them:
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#080808",
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "check-project-health",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Windows, macOS, Linux",
    description: description,
    url: siteUrl,
    author: {
      "@type": "Person",
      name: "Yash Nandvana",
      url: "https://github.com/yash-nandvana",
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    softwareVersion: "1.0.0",
    downloadUrl: "https://www.npmjs.com/package/check-project-health",
    installUrl: "https://www.npmjs.com/package/check-project-health",
    sameAs: [
      "https://github.com/yash-nandvana/project-health",
      "https://www.npmjs.com/package/check-project-health",
    ],
    keywords: "cli, developer tools, health, dashboard, npm audit, git, terminal",
  };

  return (
    <html lang="en">
      <body className={`${syne.variable} ${jetbrainsMono.variable} antialiased font-mono`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
