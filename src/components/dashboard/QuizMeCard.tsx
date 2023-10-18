"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { BrainCircuit } from "lucide-react";

type Props = {};

const QuizMeCard = (props: Props) => {
  const router = useRouter(); // Next.jsのルーターを取得
  return (
    <Card
      className="hover:cursor-pointer hover:opacity-75"
      onClick={() => {
        router.push("/quiz");// クイズページへのルーティング
      }}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-2xl font-bold">クイズに挑戦！</CardTitle>
        {/* 脳の画像アイコンを表示 */}
        <BrainCircuit size={28} strokeWidth={2.5} />
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
        好きなお題を選んでオリジナルクイズに挑戦しよう!
        </p>
      </CardContent>
    </Card>
  );
};

export default QuizMeCard;