import React from "react";

import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";
import QuizCreation from "@/components/forms/QuizCreation";

export const metadata = { // メタデータを定義
  title: "クイズ | QuizGenius",
  description: "好きなクイズに挑戦しよう!",
};

interface Props {
  searchParams: { // URLのクエリパラメータを受け取る
    topic?: string;
  };
}

const Quiz = async ({ searchParams }: Props) => { // URLのクエリパラメータを受け取る
  const session = await getAuthSession(); // セッションを取得
  if (!session?.user) { // セッションがない場合は、ホームページにリダイレクト
    redirect("/");
  }
  return <QuizCreation topic={searchParams.topic ?? ""} />; // QuizCreationコンポーネントにtopicを渡す
};

export default Quiz;