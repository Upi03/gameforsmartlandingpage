import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "../assets/webfont/tabler-icons.min.css";
import "../assets/css/swiper-bundle.min.css";
import "./globals.css";
import "../assets/css/bootstrap.css";
import "../assets/css/style.css";

import Preloader from "@/components/Preloader";
import NotificationArea from "@/components/NotificationArea";
import ConnectWalletModal from "@/components/ConnectWalletModal";
import UserAccountPopup from "@/components/UserAccountPopup";

const inter = Inter({ subsets: ["latin"] });
import { Space_Grotesk } from "next/font/google";

const spaceGrotesk = Space_Grotesk({
    subsets: ["latin"],
    weight: ['300', '400', '500', '600', '700'],
    variable: '--font-space-grotesk'
});

export const metadata: Metadata = {
    title: "GameForSmart - Belajar Coding Interaktif",
    description: "Kuasai teknologi masa depan dengan platform belajar coding terbaik untuk anak muda.",
};

import { SearchProvider } from "@/context/SearchContext";
import { SidebarProvider } from "@/context/SidebarContext";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning={true}>
            <head>
                <link rel="shortcut icon" href="/assets/img/gameforsmartlogo.png" type="image/x-icon" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" />
            </head>
            <body className={`${inter.className} ${spaceGrotesk.variable} overflow-x-hidden`} suppressHydrationWarning={true}>
                <SearchProvider>
                    <SidebarProvider>
                        <Preloader />
                        <div className="cursor"></div>
                        <NotificationArea />
                        <ConnectWalletModal />
                        <UserAccountPopup />
                        {children}
                    </SidebarProvider>
                </SearchProvider>

                {/* Legacy Scripts */}
                <Script src="/assets/js/jquery.min.js" strategy="beforeInteractive" />
                <Script src="/assets/js/bootstrap.bundle.min.js" strategy="afterInteractive" />
                <Script src="/assets/js/gsap.min.js" strategy="afterInteractive" />
                <Script src="/assets/js/SplitText.min.js" strategy="afterInteractive" />
                <Script src="/assets/js/ScrollTrigger.min.js" strategy="afterInteractive" />
                <Script src="/assets/js/ScrollMagic.min.js" strategy="afterInteractive" />
                <Script src="/assets/js/animation.gsap.min.js" strategy="afterInteractive" />
                <Script src="/assets/js/lenis.min.js" strategy="afterInteractive" />
                <Script src="/assets/js/swiper-bundle.min.js" strategy="afterInteractive" />
                <Script src="/assets/js/vanilla-tilt.js" strategy="afterInteractive" />
                <Script src="/assets/js/apexcharts.js" strategy="afterInteractive" />
                <Script src="/assets/js/gsap-customization.js" strategy="afterInteractive" />
                <Script src="/assets/js/main.js" strategy="afterInteractive" />
            </body>
        </html>
    );
}
