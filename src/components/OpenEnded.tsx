"use client";
import { cn, formatTimeDelta } from "@/lib/utils";
import { Game, Question } from "@prisma/client";
import { differenceInSeconds } from "date-fns";
import { BarChart, ChevronRight, Loader2, Timer } from "lucide-react";
import React from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button, buttonVariants } from "./ui/button";
import OpenEndedPercentage from "./OpenEndedPercentage";
import BlankAnswerInput from "./BlankAnswerInput";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { checkAnswerSchema, endGameSchema } from "@/schemas/questions";
import axios from "axios";
import { useToast } from "./ui/use-toast";
import Link from "next/link";

type Props = {
  game: Game & { questions: Pick<Question, "id" | "question" | "answer">[] }; //ゲームオブジェクト
};

const OpenEnded = ({ game }: Props) => { //ゲームオブジェクトを受け取る
  const [hasEnded, setHasEnded] = React.useState(false); //ゲームが終了したかどうか
  const [questionIndex, setQuestionIndex] = React.useState(0); //問題のインデックス
  const [blankAnswer, setBlankAnswer] = React.useState(""); //空欄の答え
  const [averagePercentage, setAveragePercentage] = React.useState(0); //平均正答率
  const currentQuestion = React.useMemo(() => { //現在の問題
    return game.questions[questionIndex]; //現在の問題を返す
  }, [questionIndex, game.questions]); //questionIndexとgame.questionsが変更された場合に再計算
  const { mutate: endGame } = useMutation({  //ゲームを終了する
    mutationFn: async () => { //mutationFnは、useMutationフックによって呼び出される関数
      const payload: z.infer<typeof endGameSchema> = { //payloadは、ゲームを終了するために必要なデータ
        gameId: game.id, //ゲームID
      };
      const response = await axios.post(`/api/endGame`, payload); //ゲームを終了するために、エンドポイントにリクエストを送信
      return response.data; //レスポンスデータを返す
    },
  });
  const { toast } = useToast();
  const [now, setNow] = React.useState(new Date()); //現在時刻
  const { mutate: checkAnswer, isLoading: isChecking } = useMutation({ //答えをチェックする
    mutationFn: async () => { //mutationFnは、useMutationフックによって呼び出される関数
      let filledAnswer = blankAnswer; //空欄の答え
      document.querySelectorAll<HTMLInputElement>("#user-blank-input").forEach((input) => { //空欄の答えを取得
        filledAnswer = filledAnswer.replace("_____", input.value); //空欄の答えを取得
        input.value = ""; //空欄の答えをクリア
      });
      const payload: z.infer<typeof checkAnswerSchema> = { //payloadは、答えをチェックするために必要なデータ
        questionId: currentQuestion.id, //問題ID
        userInput: filledAnswer, //空欄の答え
      };
      const response = await axios.post(`/api/checkAnswer`, payload); //答えをチェックするために、エンドポイントにリクエストを送信
      return response.data;  //レスポンスデータを返す
    },
  });
  React.useEffect(() => { //ゲームが終了した場合
    if (!hasEnded) { //ゲームが終了していない場合
      const interval = setInterval(() => { //1秒ごとに現在時刻を更新
        setNow(new Date()); 
      }, 1000);
      return () => clearInterval(interval); //intervalをクリア
    }
  }, [hasEnded]); //hasEndedが変更された場合に再計算

  const handleNext = React.useCallback(() => { //次の問題に進む
    checkAnswer(undefined, { //答えをチェックする
      onSuccess: ({ percentageSimilar }) => { //答えが正しい場合
        toast({
          title: `あなたの回答は${percentageSimilar}% 答えに近いです`, //正答率を表示
        });
        setAveragePercentage((prev) => { //平均正答率を計算
          return (prev + percentageSimilar) / (questionIndex + 1); //平均正答率を返す
        });
        if (questionIndex === game.questions.length - 1) { //最後の問題の場合
          endGame(); //ゲームを終了する
          setHasEnded(true); //ゲームが終了したことを設定
          return;
        }
        setQuestionIndex((prev) => prev + 1); //問題のインデックスをインクリメント
      },
      onError: (error) => { //答えが正しくない場合
        console.error(error); //エラーをコンソールに出力
        toast({
          title: "Something went wrong", //エラーを表示
          variant: "destructive",
        });
      },
    });
  }, [checkAnswer, questionIndex, toast, endGame, game.questions.length]); //checkAnswer, questionIndex, toast, endGame, game.questions.lengthが変更された場合に再計算
  React.useEffect(() => { //Enterキーが押された場合
    const handleKeyDown = (event: KeyboardEvent) => { //キーボードイベントを処理する
      const key = event.key; 
      if (key === "Enter") { 
        handleNext(); //次の問題に進む
      }
    };
    document.addEventListener("keydown", handleKeyDown); //キーボードイベントを追加
    return () => {
      document.removeEventListener("keydown", handleKeyDown); //キーボードイベントを削除
    };
  }, [handleNext]); //handleNextが変更された場合に再計算

  if (hasEnded) { //ゲームが終了した場合
    return (
      <div className="absolute flex flex-col justify-center -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
        <div className="px-4 py-2 mt-2 font-semibold text-white bg-green-500 rounded-md whitespace-nowrap">
          回答時間：{" "}
          {formatTimeDelta(differenceInSeconds(now, game.timeStarted))} 
        </div>
        <Link
          href={`/statistics/${game.id}`}
          className={cn(buttonVariants({ size: "lg" }), "mt-2")}
        >
          View Statistics
          <BarChart className="w-4 h-4 ml-2" />
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
            <span className="text-slate-400">Topic</span> &nbsp;
            <span className="px-2 py-1 text-white rounded-lg bg-slate-800">
              {game.topic}
            </span>
          </p>
          <div className="flex self-start mt-3 text-slate-400">
            <Timer className="mr-2" />
            {formatTimeDelta(differenceInSeconds(now, game.timeStarted))}
          </div>
        </div>
        <OpenEndedPercentage percentage={averagePercentage} />
      </div>
      <Card className="w-full mt-4">
        <CardHeader className="flex flex-row items-center">
          <CardTitle className="mr-5 text-center divide-y divide-zinc-600/50">
            <div>{questionIndex + 1}</div>
            <div className="text-base text-slate-400">
              {game.questions.length}
            </div>
          </CardTitle>
          <CardDescription className="flex-grow text-lg">
            {currentQuestion?.question}
          </CardDescription>
        </CardHeader>
      </Card>
      <div className="flex flex-col items-center justify-center w-full mt-4">
        <BlankAnswerInput
          setBlankAnswer={setBlankAnswer}
          answer={currentQuestion.answer}
        />
        <Button
          variant="outline"
          className="mt-4"
          disabled={isChecking || hasEnded}
          onClick={() => {
            handleNext();
          }}
        >
          {isChecking && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          Next <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default OpenEnded;