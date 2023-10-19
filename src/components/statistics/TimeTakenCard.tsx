import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Hourglass } from "lucide-react";
import { formatTimeDelta } from "@/lib/utils";
import { differenceInSeconds } from "date-fns";

type Props = { //時間計測カード
  timeEnded: Date; //終了時間
  timeStarted: Date; //開始時間
};

const TimeTakenCard = ({ timeEnded, timeStarted }: Props) => { 
  return (
    <Card className="md:col-span-4"> {/* カード */}
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0"> {/* カードヘッダー */}
        <CardTitle className="text-2xl font-bold">回答時間</CardTitle> {/* タイトル */}
        <Hourglass /> {/* 砂時計アイコン */}
      </CardHeader> 
      <CardContent> {/* カード本文 */}
        <div className="text-sm font-medium"> {/* テキスト */}
          {formatTimeDelta(differenceInSeconds(timeEnded, timeStarted))} {/* 時間差 */}
        </div>
      </CardContent>
    </Card>
  );
};

export default TimeTakenCard;