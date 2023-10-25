// api/game

import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/nextauth";
import { quizCreationSchema } from "@/schemas/forms/quiz";
import { NextResponse } from "next/server";
import { z } from "zod";
import axios from "axios";

export async function POST(req: Request, res: Response) {
  console.log("game api called");
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      console.log("user not logged in");
      return NextResponse.json(
        {
          error: "You must e logged in to play",
        },
        {
          status: 401,
        }
      );
    }
    const body = await req.json();
    const { topic, type, amount } = quizCreationSchema.parse(body);
    const game = await prisma.$transaction([
      prisma.game.create({
        data: {
          gameType: type,
          timeStarted: new Date(),
          userId: session.user.id,
          topic,
        },
      }),
      prisma.topic_count.upsert({
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
      }),
    ]);

    const { data } = await axios.post(
      `${process.env.API_URL as string}/api/questions`,
      {
        amount,
        topic,
        type,
      }
    );

    console.log("api/questions :", amount, topic, type);

    let manyData;
      type question = {
        question: string;
        answer: string;
        option1: string;
        option2: string;
        option3: string;
      };

      manyData = data.questions.map((question: question) => {
        let options = [
          question.option1,
          question.option2,
          question.option3,
          question.answer,
        ];
        return {
          question: question.question,
          answer: question.answer,
          options: JSON.stringify(options),
          gameId: game[0].id,
          questionType: "mcq",
        };
      });
    
    // prisma.question.createManyを使用して一括で保存
    await prisma.question.createMany({
      data: manyData,
    });
 
  
    return NextResponse.json(
      {
        gameId: game[0].id,
      },
      { status: 200 }
    );
  } catch (error) {
    // エラーハンドリングを改善
    if (error instanceof z.ZodError) {
      console.error("Zod Error:", error.issues);
      return NextResponse.json({ error: error.issues }, { status: 400 });
    } else {
      console.error("Unexpected Error:", error);
      return NextResponse.json(
        {
          error: "An unexpected error occurred",
        },
        { status: 500 }
      );
    }
  }
}