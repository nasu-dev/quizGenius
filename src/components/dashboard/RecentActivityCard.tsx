import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";
import HistoryComponent from "../HistoryComponent";
import { prisma } from "@/lib/db";

type Props = {};

const RecentActivityCard = async (props: Props) => { //最近のアクティビティカード
  const session = await getAuthSession();
  if (!session?.user) {
    return redirect("/");
  }
  const games_count = await prisma.game.count({
    where: {
      userId: session.user.id,
    },
  });
  return (
    <Card className="col-span-4 lg:col-span-3">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          <Link href="/history">最近のアクティビティ</Link>
        </CardTitle>
        <CardDescription>
        良い調子です！これまで{games_count} 個のクイズに挑戦しました！
        </CardDescription>
      </CardHeader>
      <CardContent className="mt-0 md:mt-4 ml-8 max-h-[325px] overflow-scroll hidden-scrollbar"> {/* カード本文 */}
        <HistoryComponent limit={10} userId={session.user.id} /> {/* 履歴コンポーネント */}
      </CardContent>
    </Card>
  );
};

export default RecentActivityCard;