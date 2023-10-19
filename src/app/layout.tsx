import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "../lib/utils";
import Navbar from "../components/Navbar";
import Providers from "@/components/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "QuizGenius",
  description:
    "QuizGeniusはChatGPTを用いたAIクイズ自動生成プラットフォームです。",
};


// 全てのページで使用されるレイアウトを定義する
export default function RootLayout({
  children,  
}: {
  children: React.ReactNode;  
}) {
  return (
    <html lang="ja">
      <body className={cn(inter.className, "antialiased min-h-screen pt-16")}> 
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
