import type { Metadata } from "next";
import "./globals.css";
import { WeddingProvider } from "@/context/WeddingContext";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "WeddingOS — The Occasion Guest Operating System",
  description: "Manage occasion invitations, RSVPs, guests, events, food preferences, logistics and check-in in one powerful platform. Run Your Occasion Like a System, Not a Spreadsheet.",
  keywords: ["wedding os", "occasion management", "wedding guest CRM", "rsvp platform", "luxury occasion operations", "catering intelligence", "qr checkin"],
  openGraph: {
    title: "WeddingOS — The Occasion Guest Operating System",
    description: "Run Your Occasion Like a System, Not a Spreadsheet. Invitations, RSVPs, guest management, food planning, logistics, and live occasion operations.",
    url: "https://weddingos.com",
    siteName: "WeddingOS",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WeddingOS — The Occasion Guest Operating System",
    description: "Manage invitations, RSVPs, guests, events, food preferences, logistics, and live occasion operations from one beautiful workspace.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#FAF7F2] text-[#2D1B28] font-sans antialiased selection:bg-[#74182E] selection:text-white">
        <WeddingProvider>
          {children}
          <Toaster position="top-right" richColors />
        </WeddingProvider>
      </body>
    </html>
  );
}
