import DetailsDialog from "@/components/DetailsDialog";
import HistoryCard from "@/components/dashboard/HistoryCard";
import HotTopicsCard from "@/components/dashboard/HotTopicsCard";
import QuizMeCard from "@/components/dashboard/QuizMeCard";
import RecentActivityCard from "@/components/dashboard/RecentActivityCard";
import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";
import React from "react";

type Props = {};

export const metadata = {
  title: "ダッシュボード | QuizGenius",
  description: "好きなお題で自分だけのオリジナルクイズに挑戦しましょう!",
};

const Dasboard = async (props: Props) => { 
  const session = await getAuthSession(); //セッションを取得
  if (!session?.user) { //セッションがない場合はログインページにリダイレクト
    redirect("/");
  }

  return (
    <main className="pt-4 px-8 mx-auto max-w-7xl"> {/* メインコンテンツ */}
      <div className="flex items-center"> {/* ヘッダー */}
        <h2 className="mr-2 text-3xl font-bold tracking-tight"> {/* ヘッダータイトル */}
          ダッシュボード
        </h2>
        
      </div>

      <div className="grid gap-6 mt-4 md:grid-cols-2 "> {/* グリッド */}
        <QuizMeCard /> {/* クイズに挑戦 */}
        <HistoryCard /> {/* 履歴 */}
      </div>
      <div className="grid gap-6 my-6 md:grid-cols-2 lg:grid-cols-7"> {/* グリッド */}
        <HotTopicsCard /> {/* トピック */}
        <RecentActivityCard /> {/* 最近のアクティビティ */}
      </div>
    </main>
  );
};

export default Dasboard;
