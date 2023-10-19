import { prisma } from "@/lib/db";
import { endGameSchema } from "@/schemas/questions";
import { NextResponse } from "next/server";

// ゲームの終了を表すための API ルート
export async function POST(req: Request, res: Response) {
  try {
    const body = await req.json();  // HTTP リクエストのボディからデータを取得
    const { gameId } = endGameSchema.parse(body);  // ボディからゲームのIDを取得


    // ゲームのIDを使って、データベースからゲームを取得
    const game = await prisma.game.findUnique({
      where: {
        id: gameId,
      },
    });
    if (!game) {  // もしゲームが存在しない場合、エラーを返す
      return NextResponse.json(
        {
          message: "Game not found",
        },
        {
          status: 404,
        }
      );
    } // もしゲームが存在する場合、ゲームの終了時間を更新
    await prisma.game.update({
      where: {
        id: gameId,
      },
      data: {
        timeEnded: new Date(),
      },
    }); // ゲームの終了を表すメッセージを返す
    return NextResponse.json({
      message: "ゲームが終了しました",
    });
  } catch (error) {  // エラーが発生した場合、エラーを返す
    return NextResponse.json(
      {
        message: "エラーが発生したようです。",
      },
      { status: 500 }
    );
  }
}
