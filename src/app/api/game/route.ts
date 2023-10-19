import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/nextauth";
import { quizCreationSchema } from "@/schemas/forms/quiz";
import { NextResponse } from "next/server";
import { z } from "zod";
import axios from "axios";

// クイズの作成を表すための API ルート
export async function POST(req: Request, res: Response) {
  try {
    // ユーザーの認証セッションを取得
    const session = await getAuthSession();
    if (!session?.user) {
      // もしユーザーセッションがない場合、未ログインのエラーを返す
      return NextResponse.json(
        { error: "ゲームを始めるにはログインしてください" },
        {
          status: 401,
        }
      );
    } // HTTP リクエストのボディからデータを取得
    const body = await req.json();
    const { topic, type, amount } = quizCreationSchema.parse(body); // データをデータベースに保存
    const game = await prisma.game.create({
      // ゲームの作成
      data: {
        gameType: type, // ゲームタイプ
        timeStarted: new Date(), // ゲームの開始時間
        userId: session.user.id, // ユーザーID
        topic, // お題
      },
    });
    // お題の数を更新
    await prisma.topic_count.upsert({
      where: {
        topic,
      },
      create: {
        topic,
        count: 1,
      },
      update: {
        count: {
          increment: 1,
        },
      },
    });

    // クイズの質問を取得
    const { data } = await axios.post(
      `${process.env.API_URL as string}/api/questions`,
      {
        amount,
        topic,
        type,
      }
    );
    // もしタイプが "mcq" である場合、MCQ（多肢選択問題）を生成
    if (type === "mcq") {
      type mcqQuestion = {
        question: string;
        answer: string;
        option1: string;
        option2: string;
        option3: string;
      };
      // 質問をデータベースに保存
      const manyData = data.questions.map((question: mcqQuestion) => {
        // 質問の選択肢をランダムに並び替え
        const options = [
          question.option1,
          question.option2,
          question.option3,
          question.answer,
        ].sort(() => Math.random() - 0.5);
        return {
          // 質問をデータベースに保存
          question: question.question,
          answer: question.answer,
          options: JSON.stringify(options),
          gameId: game.id,
          questionType: "mcq",
        };
      });
      // 質問をデータベースに保存
      await prisma.question.createMany({
        data: manyData,
      });
    } else if (type === "open_ended") {
      // もしタイプが "open_ended" である場合、開放型の質問を生成
      type openQuestion = {
        question: string;
        answer: string;
      };
      await prisma.question.createMany({
        data: data.questions.map((question: openQuestion) => {
          return {
            question: question.question,
            answer: question.answer,
            gameId: game.id,
            questionType: "open_ended",
          };
        }),
      });
    }
    // ゲームのIDを JSON レスポンスとして返す
    return NextResponse.json({ gameId: game.id }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      // もしエラーが ZodError の場合、バリデーションエラーを返す
      return NextResponse.json(
        { error: error.issues },
        {
          status: 400,
        }
      );
    } else {
      return NextResponse.json(
        // エラーハンドリング: もしエラーが ZodError 以外の場合、エラーを返す
        { error: "An unexpected error occurred." },
        {
          status: 500,
        }
      );
    }
  }
} // ゲームの作成を表すための API ルート
export async function GET(req: Request, res: Response) {
  try {
    // ユーザーの認証セッションを取得
    const session = await getAuthSession();
    if (!session?.user) {
      return NextResponse.json(
        { error: "You must be logged in to create a game." },
        {
          status: 401,
        }
      );
    } // HTTP リクエストのクエリパラメータからゲームのIDを取得
    const url = new URL(req.url);
    const gameId = url.searchParams.get("gameId");
    if (!gameId) {
      // もしゲームのIDがない場合、エラーを返す
      return NextResponse.json(
        { error: "You must provide a game id." },
        {
          status: 400,
        }
      );
    }
    // ゲームのIDを使って、データベースからゲームを取得
    const game = await prisma.game.findUnique({
      where: {
        id: gameId,
      },
      include: {
        questions: true,
      },
    });
    if (!game) {
      // もしゲームが存在しない場合、エラーを返す
      return NextResponse.json(
        { error: "Game not found." },
        {
          status: 404,
        }
      );
    }
    return NextResponse.json(
      // ゲームを JSON レスポンスとして返す
      { game },
      {
        status: 400,
      }
    );
  } catch (error) {
    // エラーが発生した場合、エラーを返す
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      {
        status: 500,
      }
    );
  }
}
