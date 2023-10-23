import { buttonVariants } from "@/components/ui/button";
import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/nextauth";
import { ChevronLeft, Home, LucideLayoutDashboard, RefreshCcw, RefreshCw } from "lucide-react";
import Link from "next/link";

import { redirect } from "next/navigation";
import React from "react";
import ResultsCard from "@/components/statistics/ResultsCard";
import AccuracyCard from "@/components/statistics/AccuracyCard";
import TimeTakenCard from "@/components/statistics/TimeTakenCard";
import QuestionsList from "@/components/statistics/QuestionsList";

type Props = {
  params: {
    gameId: string;
  };
};

const Statistics = async ({ params: { gameId } }: Props) => {
  // gameIdを受け取る
  const session = await getAuthSession(); // セッションを取得
  if (!session?.user) {
    return redirect("/");
  }
  const game = await prisma.game.findUnique({
    // prisma.game.findUnique関数は、Prismaによって自動生成された関数で、指定された条件に一致するデータベースのレコードを取得するために使用される
    where: { id: gameId },
    include: { questions: true },
  });
  if (!game) {
    return redirect("/");
  }

  let accuracy: number = 0; //正答率

  let totalCorrect = game.questions.reduce((acc, question) => {
    //正答数を計算
    if (question.isCorrect) {
      //正答の場合
      return acc + 1; //正答数をインクリメント
    }
    return acc; //正答数を返す
  }, 0);
  accuracy = (totalCorrect / game.questions.length) * 100; //正答率を計算

  return (
    <>
      <div className="p-8 mx-auto max-w-7xl">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">サマリー</h2>
        </div>

        <div className="grid gap-4 mt-4 md:grid-cols-7">
          <ResultsCard accuracy={accuracy} />
          <AccuracyCard accuracy={accuracy} />
          <TimeTakenCard
            timeEnded={new Date(game.timeEnded ?? 0)} // ゲームの終了時間を取得
            timeStarted={new Date(game.timeStarted ?? 0)} // ゲームの開始時間を取得
          />
        </div>
        <QuestionsList questions={game.questions} />
        <div className="flex items-center justify-between space-x-2 mt-6">
        <Link
          href="/history"
          className={buttonVariants({ variant: "outline" })}
        >
          <ChevronLeft className="m-0 md:mr-2" />
          <span className="hidden md:inline">履歴一覧に戻る</span>
        </Link>
        <Link
          href={"/quiz?topic=" + game.topic}
          className={buttonVariants({ variant: "outline" })}
        >
          <RefreshCw className="m-0 md:mr-2"/>
          <span className="hidden md:inline">もう一度挑戦する</span>
        </Link>
        <Link
          href="/dashboard"
          className={buttonVariants({ variant: "outline" })}
        >
          <span className="hidden md:inline">ダッシュボードに戻る</span>
          <Home className="m-0 md:ml-2"/>
        </Link>
      </div>
      </div>
      
    </>
  );
};

export default Statistics;
