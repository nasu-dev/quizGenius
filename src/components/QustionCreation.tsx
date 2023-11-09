"use client";
import { Game, Question } from "@prisma/client";
import React from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button, buttonVariants } from "./ui/button";
import { differenceInSeconds } from "date-fns";
import Link from "next/link";
import { BarChart, ChevronRight, Loader2, Timer } from "lucide-react";
import { checkAnswerSchema, endGameSchema } from "@/schemas/questions";
import { cn, formatTimeDelta } from "@/lib/utils";
import QuestionCounter from "./QuestionCounter";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";

type Props = {
  game: Game & { questions: Pick<Question, "id" | "options" | "question">[] };
  // Pickは、指定されたプロパティのみを選択して新しい型を生成するためのTypeScriptのユーティリティ。
  // ここではQuestion型から"id"、"options"、"question"プロパティのみを選択。
};

const Question = ({ game }: Props) => {
  const [questionIndex, setQuestionIndex] = React.useState(0); //問題番号
  const [hasEnded, setHasEnded] = React.useState(false); //終了フラグ
  const [stats, setStats] = React.useState({
    //統計情報
    correct_answers: 0,
    wrong_answers: 0,
  });
  const [selectedChoice, setSelectedChoice] = React.useState<number>(0); //選択肢
  const [now, setNow] = React.useState(new Date()); //現在時刻

  const currentQuestion = React.useMemo(() => {
    // 現在の問題を`useMemo`を使用してメモ化する。これにより、`questionIndex`または`game.questions`が変更されない限り再計算されない。
    return game.questions[questionIndex];
  }, [questionIndex, game.questions]); //問題番号または問題一覧が変更されたら再計算

  const options = React.useMemo(() => {
    //選択肢
    if (!currentQuestion) return [];
    if (!currentQuestion.options) return [];
    return JSON.parse(currentQuestion.options as string) as string[]; //JSON形式の選択肢をパース
  }, [currentQuestion]); //現在の問題が変更されたら再計算

  const { toast } = useToast();
  // useMutationは、非同期操作をラップし、APIの呼び出しやデータの変更といった操作を行うためのユーティリティ
  const { mutate: checkAnswer, isLoading: isChecking } = useMutation({
    //回答チェック
    mutationFn: async () => {
      //回答チェックAPIを呼び出す
      const payload: z.infer<typeof checkAnswerSchema> = {
        //回答チェックAPIのリクエストボディ
        questionId: currentQuestion.id, //問題ID
        userInput: options[selectedChoice], //ユーザーの回答
      };
      const response = await axios.post(`/api/checkAnswer`, payload); //回答チェックAPIを呼び出す
      return response.data; //回答チェックAPIのレスポンスを返す
    },
  });

  const { mutate: endGame } = useMutation({
    //ゲーム終了
    mutationFn: async () => {
      //ゲーム終了APIを呼び出す
      const payload: z.infer<typeof endGameSchema> = {
        //ゲーム終了APIのリクエストボディ
        gameId: game.id, //ゲームID
      };
      const response = await axios.post(`/api/endGame`, payload); //ゲーム終了APIを呼び出す
      return response.data; //ゲーム終了APIのレスポンスを返す
    },
  });

  React.useEffect(() => {
    //現在時刻の更新
    const interval = setInterval(() => {
      if (!hasEnded) {
        setNow(new Date());
      }
    }, 1000); //1秒ごとに現在時刻を更新
    return () => clearInterval(interval);
  }, [hasEnded]); //終了フラグが変更されたらクリア

  const handleNext = React.useCallback(() => {
    //次へボタンの処理
    checkAnswer(undefined, {
      onSuccess: ({ isCorrect }) => {
        if (isCorrect) {
          //正解の場合
          setStats((stats) => ({
            //統計情報を更新
            ...stats,
            correct_answers: stats.correct_answers + 1,
          }));
          try {
          toast({
            title: "正解！",
            description: "Congrats! おめでとうございます！",
            variant: "success",
          });
        } catch (error) {
          console.error("Toast error:", error);
        }
        } else {
          //不正解の場合
          setStats((stats) => ({
            ...stats,
            wrong_answers: stats.wrong_answers + 1,
          }));
          try {
          toast({
            title: "不正解！",
            description: "Uh oh! Let's try again!",
            variant: "destructive",
          });
        } catch (error) {
          console.error("Toast error:", error);
        }
        }
        if (questionIndex === game.questions.length - 1) {
          //最後の問題の場合
          endGame(); //ゲーム終了APIを呼び出す
          setHasEnded(true); //終了フラグを立てる
          return;
        }
        setQuestionIndex((questionIndex) => questionIndex + 1); //問題番号を更新
      },
    });
  }, [checkAnswer, questionIndex, game.questions.length, toast, endGame]); //回答チェック、問題番号、問題一覧、ゲーム終了APIを呼び出す

  React.useEffect(() => {
    //キーボードショートカット
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key;

      if (key === "1") {
        setSelectedChoice(0);
      } else if (key === "2") {
        setSelectedChoice(1);
      } else if (key === "3") {
        setSelectedChoice(2);
      } else if (key === "4") {
        setSelectedChoice(3);
      } else if (key === "Enter") {
        handleNext();
      }
    };

    document.addEventListener("keydown", handleKeyDown); //キーボードショートカットの登録

    return () => {
      document.removeEventListener("keydown", handleKeyDown); //キーボードショートカットのクリア
    };
  }, [handleNext]); //次へボタンの処理

  if (hasEnded) {
    //終了した場合
    return (
      <div className="absolute flex flex-col justify-center -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
        <div className="px-4 py-2 mt-2 font-semibold text-white bg-green-500 rounded-md whitespace-nowrap">
          回答時間：{" "}
          {formatTimeDelta(differenceInSeconds(now, game.timeStarted))}{" "}
          {/* 回答時間 */}
        </div>
        <Link
          href={`/statistics/${game.id}`} //統計情報ページへのリンク
          className={cn(buttonVariants({ size: "lg" }), "mt-2")} //ボタンのスタイル
        >
          結果を見る
          <BarChart className="w-4 h-4 ml-2" /> {/* バーチャートアイコン */}
        </Link>
      </div>
    );
  }

  return (
    <div className="absolute -translate-x-1/2 -translate-y-1/2 md:w-[80vw] max-w-4xl w-[90vw] top-1/2 left-1/2">
      <div className="flex flex-row justify-between">
        <div className="flex flex-col">
          {/* topic */}
          <p>
            <span className="text-slate-400">トピック</span> &nbsp;
            <span className="px-2 py-1 text-white rounded-lg bg-slate-800">
              {game.topic}
            </span>
          </p>
          <div className="flex self-start mt-3 text-slate-400">
            <Timer className="mr-2" /> {/* タイマーアイコン */}
            {formatTimeDelta(differenceInSeconds(now, game.timeStarted))}
          </div>
        </div>
        <QuestionCounter //問題番号
          correct_answers={stats.correct_answers}
          wrong_answers={stats.wrong_answers}
        />
      </div>
      <Card className="w-full mt-4">
        <CardHeader className="flex flex-row items-center">
          <CardTitle className="mr-5 text-center divide-y divide-zinc-600/50">
            <div>{questionIndex + 1}</div> {/* 問題番号 */}
            <div className="text-base text-slate-400">
              {game.questions.length}
            </div>
          </CardTitle>
          <CardDescription className="flex-grow text-lg">
            {currentQuestion?.question} {/* 問題文 */}
          </CardDescription>
        </CardHeader>
      </Card>
      <div className="flex flex-col items-center justify-center w-full mt-4">
        {options.map((option, index) => {
          return (
            <Button
              key={option}
              variant={selectedChoice === index ? "default" : "outline"}
              className="justify-start w-full py-8 mb-4"
              onClick={() => setSelectedChoice(index)}
            >
              <div className="flex items-center justify-start">
                <div className="p-2 px-3 mr-5 border rounded-md">
                  {index + 1}
                </div>
                <div className="text-start">{option}</div>
              </div>
            </Button>
          );
        })}
        <Button //次へボタン
          variant="default"
          className="mt-2"
          size="lg"
          disabled={isChecking || hasEnded}
          onClick={() => {
            handleNext(); //次へボタンの処理
          }}
        >
          {isChecking && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}{" "}
          {/* ローディングアイコン */}
          次へ <ChevronRight className="w-4 h-4 ml-2" /> {/* 次へアイコン */}
        </Button>
      </div>
    </div>
  );
};

export default Question;
