// app/layout.js
import "./globals.css";
import Image from "next/image";
import Link from "next/link";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "FaithLinks | Daily Catholic Reflection",
  description: "Daily scripture readings, reflections, and prayers.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 text-gray-900 font-sans min-h-screen flex flex-col`}>      
        {/* Header */}
        <header className="w-full bg-blue-900 text-white py-4 px-6 flex items-center justify-between">
          <div className="flex items-center">
            <Image src="/faithlinks-logo.png" alt="FaithLinks Logo" width={40} height={40} />
            <span className="ml-2 font-bold text-xl">FaithLinks</span>
          </div>
          <nav className="space-x-4">
            <Link href="/" className="hover:underline">Home</Link>
            <Link href="/exegesis" className="hover:underline">Deep Dive</Link>
            <Link href="/saint" className="hover:underline">Saint</Link>
            <Link href="/donate" className="hover:underline">Donate</Link>
            <Link href="/shop" className="hover:underline">Shop</Link>
          </nav>
        </header>

        {/* Main content */}
        <main className="flex-grow container mx-auto px-4 py-8">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-white text-gray-500 text-center py-4 text-sm">
          &copy; {new Date().getFullYear()} FaithLinks / DailyWord LLC
        </footer>
      </body>
    </html>
  );
}