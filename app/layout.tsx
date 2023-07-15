import "./globals.css"
import type { Metadata } from "next"
import { ReactNode } from "react"
import { Montserrat } from "next/font/google"
import Navbar from "@/components/Navbar"

const montserrat = Montserrat({
    subsets: ["latin"],
    display: "swap"
})

export const metadata: Metadata = {
    title: "Promptshare",
    description: "Share prompts with this web app",
    icons: "/caramel.png"
}

export default function RootLayout({
    children,
}: {
    children: ReactNode
}) {
    return (
        <html
            lang="en"
            className={`${montserrat.className} relative h-full`}
            suppressHydrationWarning={true}
        >
            <body className="max-w-[1200px] mx-auto h-full">
                <Navbar />
                {children}
            </body>
        </html>
    )
}
