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
import { Github, HelpCircle, Info, Linkedin, Youtube } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useBudouX } from "../lib/useBudouX";

type Props = {};

const DetailsDialog = (props: Props) => {
  const { parse } = useBudouX();
  return (
    <Dialog>
      {/* ダイアログトリガー */}
      <DialogTrigger className="flex items-center bg-none">
        <span className="flex items-center justify-center h-9 w-9 px-auto rounded-md border hover:bg-accent">
          {" "}
          {/* ボタン */}
          <Info className="w-5 h-5" />
        </span>
      </DialogTrigger>

      {/* ダイアログコンテンツ */}
      <DialogContent className="w-[70vw] max-w-[100vw] md:w-[50vw] ">
        {/* ダイアログヘッダー */}
        <DialogHeader>
          <DialogTitle className="text-2xl text-center md:text-start mt-4">
            QuizGeniusへようこそ!
          </DialogTitle>
          {/* ダイアログ詳細 */}
          <DialogDescription>
            <div className="flex items-center justify-center sm:justify-start gap-3 my-2">
              <p className="flex items-center justify-center">
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
            <p className="my-4 mt-4 break-words text-center md:text-start ">
              AIが導く新時代のクイズエンターテインメント誕生。
              <br />
              <span className="font-semibold">QuizGenius</span>
              {parse(
                "は、最新のAI技術を駆使した新しいクイズアプリです。あなたの興味に基づいて、人工知能がオリジナル問題を生成します。さっそく挑戦してみましょう。"
              )}
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
