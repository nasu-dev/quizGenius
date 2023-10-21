import { prisma } from "@/lib/db";
import { Clock, CopyCheck, Edit2, Flower, Globe2 } from "lucide-react";
import Link from "next/link";
import React from "react";
import QuestionCounter from "./QuestionCounter";

type Props = {
  limit: number;
  userId: string;
};

const HistoryComponent = async ({ limit, userId }: Props) => {
  // findMany関数：複数件のレコードを取得する。見つからない場合は空配列を返す
  const games = await prisma.game.findMany({
    //ゲーム一覧を取得
    take: limit, //最大取得数
    where: {
      userId,
    },
    orderBy: {
      timeStarted: "desc", //開始時間で降順ソート
    },
  });
  return (
    <div className="space-y-8">
      {games.map((game) => {
        //ゲーム一覧をループ
        return (
          <div className="flex items-center justify-between" key={game.id}>
            <div className="flex items-center">
              {/* ゲームの種類によってアイコンを変更 */}
              {game.gameType === "mcq" ? (
                <Flower className="mr-3" />
              ) : (
                <Globe2 className="mr-3" />
              )}
              <div className="ml-4 space-y-1">
                <Link
                  className="text-base font-medium leading-none underline"
                  href={`/statistics/${game.id}`}
                >
                  {game.topic}
                </Link>
                <p className="flex items-center px-2 py-1 text-xs text-white rounded-lg w-fit bg-slate-800">
                  <Clock className="w-4 h-4 mr-1" />
                  {/* 日付形式で表示 */}
                  {new Date(game.timeStarted).toLocaleDateString("ja-JP")}
                </p>
                <p className="text-sm text-muted-foreground">
                  {game.gameType === "mcq"
                    ? "言語 : Japanese"
                    : "言語 : English"}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default HistoryComponent;
