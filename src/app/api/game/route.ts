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
    const game = await prisma.game.create({
      data: {
        gameType: type,
        timeStarted: new Date(),
        userId: session.user.id,
        topic,
      },
    });

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
    if (type === "mcq") {
      type JPquestion = {
        question: string;
        answer: string;
        option1: string;
        option2: string;
        option3: string;
      };
      console.log("JPdata :", data);
      manyData = data.questions.map((JPquestion: JPquestion) => {
        let options = [
          JPquestion.option1,
          JPquestion.option2,
          JPquestion.option3,
          JPquestion.answer,
        ];
        console.log("options1 :", options);
        options = options.sort(() => Math.random() - 0.5);
        return {
          question: JPquestion.question,
          answer: JPquestion.answer,
          options: JSON.stringify(options),
          gameId: game.id,
          questionType: "mcq",
        };
      });
      console.log("manyData :", manyData);
      await prisma.question.createMany({
        data: manyData,
      });
    } else if (type === "open_ended") {
      type ENquestion = {
        question: string;
        answer: string;
        option1: string;
        option2: string;
        option3: string;
      };
      console.log("ENdata :", data);
      manyData = data.questions.map((ENquestion: ENquestion) => {
        let options = [
          ENquestion.option1,
          ENquestion.option2,
          ENquestion.option3,
          ENquestion.answer,
        ];
        console.log("options3 :", options);
        options = options.sort(() => Math.random() - 0.5);
        return {
          question: ENquestion.question,
          answer: ENquestion.answer,
          options: JSON.stringify(options),
          gameId: game.id,
          questionType: "open_ended",
        };
      });
    }
    console.log("manyData :", manyData);
    await prisma.question.createMany({
      data: manyData,
    });
  
  
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
