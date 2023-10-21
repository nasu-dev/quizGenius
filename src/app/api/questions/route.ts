 //api/questions:質問を生成するための APIルート。

import { strict_output } from "@/lib/gpt";
import { getAuthSession } from "@/lib/nextauth";
import { getQuestionsSchema } from "@/schemas/questions";
import { NextResponse } from "next/server";
import { ZodError } from "zod";


// クイズの質問を取得するための API ルート
export async function POST(req: Request, res: Response) {
  console.log("questions api called");
  try {
    // ユーザーの認証セッションを取得
    const session = await getAuthSession();

    // HTTP リクエストのボディからデータを取得
    const body = await req.json();
    console.log("questions body :", body);
    const { amount, topic, type } = getQuestionsSchema.parse(body);
    let questions: any;
    // もしタイプが "open_ended" である場合、開放型の質問を生成
    if (type === "open_ended") {
      questions = await strict_output(
        // あなたは、mcqの質問と回答を生成することができる便利なAIです。
        // 各回答の長さは15語以下でなければなりません。すべての答えと質問のペアをJSON配列に格納してください。
        "You are a helpful AI that is able to generate mcq questions and answers, the length of each answer should not be more than 15 words and should be in English, store all answers and questions and options in a JSON array",
        new Array(amount).fill(
          // あなたは${topic}`に関する難しいmcq問題をランダムに生成する必要があります。
          `You are to generate a random mcq question about ${topic} in English`
        ),
        {
          question: "question", //質問
          answer: "answer with max length of 15 words", //答え
          option1: "option1 with max length of 15 words", //選択肢1
          option2: "option2 with max length of 15 words", //選択肢2
          option3: "option3 with max length of 15 words", //選択肢3
        }
      );
      // もしタイプが "mcq" である場合、MCQ（多肢選択問題）を生成
    } else if (type === "mcq") {
      questions = await strict_output(
        // あなたは、mcqの質問と回答を生成することができる便利なAIです。
        // 各回答の長さは15語以下でなければなりません。すべての答えと質問のペアをJSON配列に格納してください。
        "You are a helpful AI that is able to generate mcq questions and answers, the length of each answer should not be more than 15 words and should be in Japanese, store all answers and questions and options in a JSON array",
        new Array(amount).fill(
          // あなたは${topic}`に関する難しいmcq問題をランダムに生成する必要があります。
          `You are to generate a random mcq question about ${topic} in Japanese`
        ),
        {
          question: "question", //質問
          answer: "answer with max length of 15 words", //答え
          option1: "option1 with max length of 15 words", //選択肢1
          option2: "option2 with max length of 15 words", //選択肢2
          option3: "option3 with max length of 15 words", //選択肢3
        }
      );
    }
    // 生成した質問を JSON レスポンスとして返す
    return NextResponse.json(
      {
        questions: questions,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    // エラーハンドリング: もしエラーが ZodError の場合、バリデーションエラーを返す
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: error.issues },
        {
          status: 400,
        }
      );
    } else {
      // それ以外のエラーの場合、予期しないエラーをログに記録し、内部エラーを返す
      console.error("elle gpt error", error);
      return NextResponse.json(
        { error: "An unexpected error occurred." },
        {
          status: 500,
        }
      );
    }
  }
}
