import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target } from "lucide-react";
type Props = { accuracy: number };

const AccuracyCard = ({ accuracy }: Props) => { //平均正答率カード
  accuracy = Math.round(accuracy * 10) / 10; //小数点第二位までに丸める
  return (
    <Card className="md:col-span-3"> {/* カード */}
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0"> {/* カードヘッダー */}
        <CardTitle className="text-2xl font-bold">正答率</CardTitle> 
        <Target /> {/* ターゲットアイコン */}
      </CardHeader>
      <CardContent> {/* カード本文 */}
        <div className="text-sm font-medium pl-3">{accuracy.toString() + "%"}</div> {/* 正答率 */}
      </CardContent>
    </Card>
  );
};

export default AccuracyCard;
