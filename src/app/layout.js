import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/layout/Navbar";
import { FitLogProvider } from "@/context/FitLogContext";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata = {
    title: "FitLog — Workout Library",
    description: "Train hard, log honest.",
};

export default function RootLayout({ children }) {
    return (
        <html
            lang="en"
            data-theme="dark"
            className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
        >
            <body className="min-h-full flex flex-col">

                <FitLogProvider>
                    <Navbar />

                    {children}
                </FitLogProvider>

            </body>
        </html>
    );
}