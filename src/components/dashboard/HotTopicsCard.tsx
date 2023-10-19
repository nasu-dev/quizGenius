import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import WordCloud from "../WordCloud";
import { prisma } from "@/lib/db";

type Props = {};

const HotTopicsCard = async (props: Props) => {
  const topics = await prisma.topic_count.findMany({}); //トピック一覧を取得
  const formattedTopics = topics.map((topic) => { //トピック一覧を整形
    return {
      text: topic.topic, //トピック名
      value: topic.count, //トピックの出現回数
    };
  });
  return (
    <Card className="col-span-4"> {/* カード */}
      <CardHeader> {/* カードヘッダー */}
        <CardTitle className="text-2xl font-bold">最新トピックス</CardTitle> {/* カードタイトル */}
        <CardDescription> {/* カード詳細 */}
          気になるトピックをクリックしてクイズを作成しましょう！
        </CardDescription> 
      </CardHeader>
      <CardContent className="pl-2"> {/* カード本文 */}
        <WordCloud formattedTopics={formattedTopics} /> {/* ワードクラウド */}
      </CardContent>
    </Card>
  );
};

export default HotTopicsCard;