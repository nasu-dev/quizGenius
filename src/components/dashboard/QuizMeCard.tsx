"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { BrainCircuit } from "lucide-react";

type Props = {};

const QuizMeCard = (props: Props) => {
  const router = useRouter(); //ルーター
  return (
    <Card
      className="hover:cursor-pointer hover:opacity-75" 
      onClick={() => {
        router.push("/quiz");// クイズページへのルーティング
      }}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-2">
        <CardTitle className="text-2xl font-bold">クイズに挑戦！</CardTitle> {/* タイトル */}
        <BrainCircuit size={28} strokeWidth={2.5} /> {/* 脳アイコン */}
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
        好きなお題を選んでオリジナルクイズに挑戦しましょう！
        </p>
      </CardContent>
    </Card>
  );
};

export default QuizMeCard;