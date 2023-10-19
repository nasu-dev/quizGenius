import OpenEnded from "@/components/OpenEnded";
import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  params: {
    gameId: string;
  };
};

const OpenEndedPage = async ({ params: { gameId } }: Props) => { // gameIdを受け取る
  const session = await getAuthSession(); // セッションを取得
  if (!session?.user) { // セッションがない場合は、ホームページにリダイレクト
    return redirect("/");
  }

  // prisma.game.findUnique関数は、Prismaによって自動生成された関数で、指定された条件に一致するデータベースのレコードを取得するために使用される
  const game = await prisma.game.findUnique({
    where: {
      id: gameId,
    },
    include: {  // includeオプションは、関連するデータを取得するために使用される
      questions: { 
        select: {
          id: true,
          question: true,
          answer: true,
        },
      },
    },
  });
  if (!game || game.gameType === "mcq") {
    return redirect("/quiz");
  }
  return <OpenEnded game={game} />; // OpenEndedコンポーネントにgameオブジェクトを渡す
};

export default OpenEndedPage;