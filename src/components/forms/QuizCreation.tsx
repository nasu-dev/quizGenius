"use client";
import { quizCreationSchema } from "@/schemas/forms/quiz";
import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button, buttonVariants } from "../ui/button";
import { Input } from "../ui/input";
import {
  BookOpen,
  CopyCheck,
  Flower,
  Globe2,
  LucideLayoutDashboard,
  XCircle,
} from "lucide-react";
import { Separator } from "../ui/separator";
import axios, { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoadingQuestions from "../LoadingQuestions";
import Link from "next/link";

type Props = {
  topic: string; //トピック名
};

type Input = z.infer<typeof quizCreationSchema>; //入力値の型

const QuizCreation = ({ topic: topicParam }: Props) => {
  //トピック名を受け取る
  const router = useRouter();
  const [showLoader, setShowLoader] = React.useState(false); //ローディング画面の表示
  const [finishedLoading, setFinishedLoading] = React.useState(false); //ローディング画面の表示
  const { toast } = useToast(); //トースト
  const { mutate: getQuestions, isLoading } = useMutation({
    //クイズの取得
    mutationFn: async ({ amount, topic, type }: Input) => {
      console.log("amount ", amount, " topic ", topic, " type ", type);
      const response = await axios.post("/api/game", { amount, topic, type });
      console.log("response.data ", response.data);
      return response.data;
    },
  });

  const form = useForm<Input>({
    resolver: zodResolver(quizCreationSchema), //バリデーション
    defaultValues: {
      //デフォルト値
      topic: topicParam, //トピック名
      type: "mcq", //クイズの種類
      amount: 3, //問題数
    },
  });

  const onSubmit = async (data: Input) => {
    //クイズの作成
    setShowLoader(true); //ローディング画面の表示
    // alert(JSON.stringify(data, null, 2))
    getQuestions(data, {
      //クイズの取得

      onError: (error) => {
        //エラー処理
        setShowLoader(false); //ローディング画面の非表示
        if (error instanceof AxiosError) {
          //Axiosのエラー
          if (error.response?.status === 500) {
            console.log("Axios-error", error.response.data);
            toast({
              //トースト
              title: "Error",
              description: "Something went wrong. Please try again later.",
              variant: "destructive",
            });
          }
        }
      },
      onSuccess: ({ gameId }: { gameId: string }) => {

        //成功時の処理
        setFinishedLoading(true); //ローディング画面の非表示

        setTimeout(() => {
          //クイズページへのルーティング
          router.push(`/play/question/${gameId}`);
        }, 300);
      },
    });
  };
  form.watch(); //フォームの監視

  if (showLoader) {
    //ローディング画面の表示
    return <LoadingQuestions finished={finishedLoading} />; //ローディング画面
  }

  return (
    <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 w-2/3  md:w-1/2 lg:w-1/3">
      {" "}
      {/* メインコンテンツ */}
      <Card>
        {" "}
        {/* カード */}
        <CardHeader>
          <div className="flex justify-between">
            <CardTitle className="text-2xl font-bold text-center">
              クイズ生成
            </CardTitle>
            <Link
              className={buttonVariants({ variant: "link" })}
              href="/dashboard"
            >
              <XCircle className="mx-0" />
            </Link>
          </div>
          <CardDescription>トピックを選んでください</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            {" "}
            {/* フォーム */}
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="topic"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>トピック</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="（例）動物、食べ物、スポーツ"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      好きなトピックを入力してください
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>生成する問題数</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="（例）3"
                        type="number"
                        {...field}
                        onChange={(e) => {
                          form.setValue("amount", parseInt(e.target.value));
                        }}
                        min={1}
                        max={10}
                      />
                    </FormControl>
                    <FormDescription>
                      1から10の数字で入力してください
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>言語モード</FormLabel>
                    <div className="flex justify-between">
                      <Button
                        variant={
                          form.getValues("type") === "mcq"
                            ? "default"
                            : "secondary" //クイズの種類がmcqの場合はdefault、open_endedの場合はsecondary
                        }
                        className="w-1/2 rounded-none rounded-l-lg" //クイズの種類がmcqの場合は左丸、open_endedの場合は右丸
                        onClick={() => {
                          form.setValue("type", "mcq");
                        }}
                        type="button"
                      >
                        <Flower className="w-4 h-4 mr-2" /> Japanese
                      </Button>
                      <Separator orientation="vertical" />
                      <Button
                        variant={
                          form.getValues("type") === "open_ended" //クイズの種類がopen_endedの場合はdefault、mcqの場合はsecondary
                            ? "default"
                            : "secondary"
                        }
                        className="w-1/2 rounded-none rounded-r-lg"
                        onClick={() => form.setValue("type", "open_ended")}
                        type="button"
                      >
                        {/* <BookOpen className="w-4 h-4 mr-2" /> 英語 */}
                        <Globe2 className="w-4 h-4 mr-2" /> English
                      </Button>
                    </div>
                    <FormDescription>
                      選択した言語でクイズが生成されます
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <CardFooter className="mx-0 px-0">
                <Button disabled={isLoading} type="submit">
                  自動生成する
                </Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizCreation;
