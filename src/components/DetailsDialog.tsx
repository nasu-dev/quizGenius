//アプリ詳細ダイアログ
"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Github, HelpCircle, Linkedin, Youtube } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

type Props = {};

const DetailsDialog = (props: Props) => {
  return (
    <Dialog>
      {/* ダイアログトリガー */}
      <DialogTrigger>
        <span className="flex items-center ml-2 pl-3 pr-2 py-1.5 text-white rounded-md bg-slate-800"> {/* ボタン */}
          はじめに
          <HelpCircle className="w-5 h-5 ml-1" /> {/* ヘルプアイコン */}
        </span>
      </DialogTrigger>

      {/* ダイアログコンテンツ */}
      <DialogContent className="w-[70vw] max-w-[100vw] md:w-[50vw]">
        {/* ダイアログヘッダー */}
        <DialogHeader>
          <DialogTitle className="text-2xl">QuizGeniusへようこそ!</DialogTitle>
          {/* ダイアログ詳細 */}
          <DialogDescription>
            <div className="flex items-center justify-center sm:justify-start gap-3 my-2">
              <p className="flex items-center">
                <Github className="w-5 h-5" />
                <Link
                  className="ml-1 underline"
                  href="https://github.com/nasu-dev/quizGenius"
                >
                  GitHub
                </Link>
              </p>
              <p className="flex items-center">
                <Linkedin className="w-5 h-5" />
                <Link
                  className="ml-1 underline"
                  href="https://www.linkedin.com/in/akito-i-9b3bb5195/"
                >
                  LinkedIn
                </Link>
              </p>
            </div>
            <p className="my-4 mt-4 break-words">
              知識とエンターテイメントの新たな次元へ。<br />
              <span className="font-semibold">QuizGenius</span>は最新AI技術を駆使したAIクイズ自動生成プラットフォームです。
              人工知能があなたの興味に基づいたクイズを分析し、あなただけのオリジナルクイズを提供します！
              これまでにはない革新的なクイズ体験を楽しみましょう！
            </p>
            <hr />
            <p className="my-4 font-semibold">
              <h4 className="text-center text-base font-semibold">使用技術</h4>
              {/* スマホでは2列、それ以外は4列で設定 */}
              <div className="grid justify-around grid-cols-2 sm:grid-cols-4 mt-4 gap-y-3">
                <div className="flex justify-items-center items-center gap-2">
                  <Image
                    alt="planetscale"
                    src="/planetscale.png"
                    width={35}
                    height={35}
                  />
                  <span className="">Planet Scale</span>
                </div>
                <div className="flex justify-items-center items-center gap-2">
                  <Image
                    alt="nextjs"
                    src="/nextjs.png"
                    width={35}
                    height={35}
                  />
                  <span className="">Next.js</span>
                </div>
                <div className="flex justify-items-center items-center gap-2">
                  <Image
                    alt="tailwind"
                    src="/tailwind.png"
                    width={35}
                    height={35}
                  />
                  <span className="">Tailwind</span>
                </div>
                <div className="flex justify-items-center items-center gap-2">
                  <Image
                    alt="nextauth"
                    src="/nextauth.png"
                    width={30}
                    height={30}
                  />
                  <span className="">NextAuth</span>
                </div>
                <div className="flex justify-items-center items-center gap-2">
                  <Image
                    alt="openai"
                    src="/openai.png"
                    width={30}
                    height={30}
                  />
                  <span className="">OpenAI</span>
                </div>

                <div className="flex justify-items-center items-center gap-2">
                  <Image
                    alt="react query"
                    src="/react-query.png"
                    width={30}
                    height={30}
                  />
                  <span className="">React Query</span>
                </div>
                <div className="flex justify-items-center items-center gap-2">
                  <Image
                    alt="primsa"
                    src="/prisma.png"
                    width={30}
                    height={30}
                  />
                  <span className="">Prisma</span>
                </div>
                <div className="flex justify-items-center items-center gap-2">
                  <Image
                    alt="typescript"
                    src="/typescript.png"
                    width={30}
                    height={30}
                  />
                  <span className="">TypeScript</span>
                </div>
              </div>
            </p>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DetailsDialog;