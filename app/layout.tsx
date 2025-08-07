import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/marketing-ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "TribeBills | Keep the Vibe Alive",
  description: "TribeBills is the simple way for your group, housemates, or friends to manage shared expenses. Split bills, track payments, and keep everyone happy with our smart expense management app.",
  keywords: "bill splitting, expense sharing, group expenses, roommate bills, shared costs, expense tracker, bill management, group payments",
  authors: [{ name: "TribeBills Team" }],
  creator: "TribeBills",
  publisher: "TribeBills",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "TribeBills | Keep the Vibe Alive",
    description: "The simple way for your group to manage shared expenses. Split bills, track payments, and keep everyone happy.",
    url: '/',
    siteName: 'TribeBills',
    images: [
      {
        url: '/marketing/images/tribebills-logo.webp',
        width: 1200,
        height: 630,
        alt: 'TribeBills - Smart Bill Splitting App',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "TribeBills | Keep the Vibe Alive",
    description: "The simple way for your group to manage shared expenses",
    images: ['/marketing/images/tribebills-logo.webp'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add these when you have the verification codes:
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // yahoo: 'your-yahoo-verification-code',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} marketing-theme`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
