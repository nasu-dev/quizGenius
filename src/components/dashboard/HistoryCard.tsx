// 履歴一覧

"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { History } from "lucide-react";

type Props = {};

const HistoryCard = (props: Props) => {
  const router = useRouter(); //ルーター
  return (
    <Card 
      className="hover:cursor-pointer hover:opacity-75 " 
      onClick={() => {
        router.push("/history"); //履歴一覧ページへ遷移
      }}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-2xl font-bold">履歴一覧</CardTitle> {/* タイトル */}
        <History size={28} strokeWidth={2.5} /> {/* 履歴アイコン */}
      </CardHeader>
      <CardContent> {/* カード本文 */}
        <p className="text-sm text-muted-foreground pl-3">
          これまでのクイズ履歴はこちらから確認できます。
        </p>
      </CardContent>
    </Card>
  );
};

export default HistoryCard;