import type { Metadata } from "next";
import "./globals.css";
import { WeddingProvider } from "@/context/WeddingContext";

export const metadata: Metadata = {
  title: "WeddingOS — The Wedding Guest Operating System",
  description: "Manage wedding invitations, RSVPs, guests, events, food preferences, logistics and check-in in one powerful platform. Run Your Wedding Like a System, Not a Spreadsheet.",
  keywords: ["wedding os", "indian wedding management", "wedding guest CRM", "wedding rsvp platform", "luxury wedding operations", "catering intelligence", "wedding qr checkin"],
  openGraph: {
    title: "WeddingOS — The Wedding Guest Operating System",
    description: "Run Your Wedding Like a System, Not a Spreadsheet. Invitations, RSVPs, guest management, food planning, logistics, and live wedding operations.",
    url: "https://weddingos.com",
    siteName: "WeddingOS",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WeddingOS — The Wedding Guest Operating System",
    description: "Manage invitations, RSVPs, guests, events, food preferences, logistics, and live wedding operations from one beautiful workspace.",
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
        </WeddingProvider>
      </body>
    </html>
  );
}
