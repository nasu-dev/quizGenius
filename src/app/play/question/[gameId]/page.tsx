import Question from "@/components/QustionCreation";
import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  params: {
    gameId: string;
  };
};

const MCQPage = async ({ params: { gameId } }: Props) => {
  const session = await getAuthSession();
  if (!session?.user) {
    console.log("no user");
    return redirect("/");
  }

  // prisma.game.findUnique関数は、Prismaによって自動生成された関数で、指定された条件に一致するデータベースのレコードを取得するために使用される
  const game = await prisma.game.findUnique({
    where: {
      id: gameId,
    },
    include: {
      // includeオプションは、関連するデータを取得するために使用される
      questions: {
        select: {
          id: true,
          question: true,
          options: true,
        },
      },
    },
  });
  if (!game) {
    return redirect("/quiz");
  }
  return <Question game={game} />; // MCQコンポーネントにgameオブジェクトを渡す
};

export default MCQPage;
