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
    console.log("game body :", body);
    const { topic, type, amount } = quizCreationSchema.parse(body);
    console.log("topic :", topic);
    const game = await prisma.game.create({
      data: {
        gameType: type,
        timeStarted: new Date(),
        userId: session.user.id,
        topic,
      },
    });

    // await prisma.topic_count.upsert({
    //     where: {
    //         topic,
    //     },
    //     create: {
    //         topic,
    //         count: 1,
    //     },
    //     update: {
    //         count: {
    //             increment: 1,
    //         },
    //     },
    // });

    console.log("game is created :", game);
    ///ここで止まってる
    const { data } = await axios.post(`https://localhost:3000/api/questions`, {
        amount,
        topic,
        type,
    });

    console.log("api/questions :", amount, topic, type);

    if (type === "mcq") {
      type mcqQuestion = {
        question: string;
        answer: string;
        option1: string;
        option2: string;
        option3: string;
      };
      console.log("mcq data :", data);
      let manyData = data.questions.map((question: mcqQuestion) => {
        let options = [
          question.option1,
          question.option2,
          question.option3,
          question.answer,
        ];
        options = options.sort(() => Math.random() - 0.5);
        console.log(options);
        return {
          question: question.question,
          answer: question.answer,
          options: JSON.stringify(options),
          gameId: game.id,
          questionType: "mcq",
        };
      });
      await prisma.question.createMany({
        data: manyData,
      });
    } else if (type === "open_ended") {
      type openQuestion = {
        question: string;
        answer: string;
      };
      let manyData = data.questions.map((question: openQuestion) => {
        return {
          question: question.question,
          answer: question.answer,
          gameId: game.id,
          questionType: "open_ended",
        };
      });
      await prisma.question.createMany({
        data: manyData,
      });
    }
    return NextResponse.json(
      {
        gameId: game.id,
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    } else {
      return NextResponse.json(
        {
          error: error,
        },
        { status: 500 }
        // { error: "An unexpected error occurred" }, { status: 500 },
      );
    }
  }
}
