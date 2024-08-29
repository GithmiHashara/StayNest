import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Nunito } from "next/font/google";
import Navbar from "./components/navbar/Navbar";
// import ClientOnly from "./components/ClientOnly";
import Modal from "./components/modals/Modals";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "StayNest",
  description: "StayNest is a platform for finding the best places to stay.",
};

const font = Nunito ({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        {/* <ClientOnly> */}
          <Modal/>
          <Navbar/>
        {/* </ClientOnly> */}
        {children}
        </body>
    </html>
  );
}
