import SignInButton from "@/components/SignInButton";
import Image from "next/image";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { useBudouX } from "../lib/useBudouX";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Github } from "lucide-react";
import Footer from "@/components/footer";

export default async function Home() {
  const session = await getServerSession();
  if (session?.user) {
    redirect("/dashboard");
  }

  const { parse } = useBudouX();

  return (
    <div>
    <div className="min-h-[70vh] flex flex-col lg:flex-row lg:justify-center items-center m-5 mt-10">
      <div className="lg:w-2/4 text-center lg:text-left mb-6">
        <h4 className="text-lg md:text-xl font-semibold tracking-tight mb-2 bg-gradient-to-r from-slate-500 to-slate-800 dark:from-slate-200 dark:to-slate-400 bg-clip-text text-transparent mr-5 md:pl-1">
          QuizGenius powered by ChatGPT
        </h4>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-slate-600 to-slate-800 dark:from-slate-200 dark:to-slate-400 bg-clip-text text-transparent leading-relaxed">
          新しいクイズ体験、
          <br />
          はじまります。
        </h1>
        <p className="text-muted-foreground mt-3 lg:mt-5 text-center lg:text-start mb-2 max-w-md mx-auto lg:mx-0 text-sm ">
          {parse("AIが導く新時代のクイズエンターテインメント誕生。")}
        </p>
        <p className="text-muted-foreground mt-3 lg:mt-5 text-center lg:text-start mb-4 max-w-xl mx-auto lg:mx-0 text-sm lg:pl-0 leading-relaxed">
          {parse(
            "QuizGeniusは、最新のAI技術を駆使した新しいクイズアプリです。あなたのお好きなお題を入力すると、人工知能が自動で入力を分析し、世界であなただけのオリジナル問題を生成します。これまでにない革新的なクイズの世界に足を踏み入れ、知識と楽しさを融合したエンターテイメントに挑戦してみましょう。"
          )}
        </p>

        <div className="mt-8 flex justify-center lg:justify-start gap-x-6 lg:gap-x-10">
          <SignInButton text="無料で始める" />
          <Link
            className="ml-1"
            href="https://github.com/nasu-dev/quizGenius"
          >
            <Button variant="outline">
              GitHubを開く
              <Github className="ml-1"/>
            </Button>
          </Link>
        </div>
      </div>

      <div className="imageContainer text-center">
        <Image
          src="/heroSection.svg" // 画像のパスを修正
          alt="heroSection"
          width={500} // パソコン画面用のサイズ
          height={400} // パソコン画面用のサイズ
          className="max-w-sm mx-auto md:max-w-full" // レスポンシブなクラス名に修正
        />
      </div>
      </div>
      <Footer />
    </div>
  );
}
