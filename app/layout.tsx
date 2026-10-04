import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dr. Mausami's Homeo Clinic",
  description: "Gentle, natural healing tailored just for you.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-zinc-50 text-zinc-800">
        <nav className="sticky top-0 z-10 bg-white border-b border-zinc-200 px-6 py-4 flex items-center justify-between">
          <Link href="/" className="font-semibold text-lg text-emerald-700">
            Homeo Clinic
          </Link>
          <div className="flex gap-6 text-sm font-medium">
            <Link href="/patients" className="hover:text-emerald-700">
              Patients
            </Link>
            <Link href="/appointments" className="hover:text-emerald-700">
              Appointments
            </Link>
          </div>
        </nav>
        <main className="flex-1 px-6 py-8 max-w-3xl mx-auto w-full">
          {children}
        </main>
      </body>
    </html>
  );
}