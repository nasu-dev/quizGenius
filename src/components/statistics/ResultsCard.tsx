import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Trophy } from "lucide-react";

type Props = { accuracy: number }; //正答率

const ResultsCard = ({ accuracy }: Props) => { //結果カード
  return (
    <Card className="md:col-span-7"> {/* カード */}
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7"> {/* カードヘッダー */}
        <CardTitle className="text-2xl font-bold">結果</CardTitle> {/* タイトル */}
        <Award /> {/* 賞アイコン */}
      </CardHeader> 
      <CardContent className="flex flex-col items-center justify-center h-3/5"> {/* カード本文 */}
        {accuracy >= 75 ? ( //正答率が75%以上の場合
          <>
            <Trophy className="mr-4" stroke="gold" size={50} /> {/* 金色のトロフィーアイコン */}
            <div className="flex flex-col text-2xl font-semibold text-center text-yellow-400"> {/* テキスト */}
              <span className="">合格です!</span> {/* テキスト */}
              <span className="text-sm text-center text-black opacity-50"> {/* テキスト */}
                {"おめでとうございます!"}
              </span>
            </div>
          </>
        ) : accuracy >=40 ? ( //正答率が40%以上の場合
          <>
            <Trophy className="mr-4" stroke="silver" size={50} /> {/* 銀色のトロフィーアイコン */}
            <div className="flex flex-col text-2xl font-semibold text-center text-stone-400"> {/* テキスト */}
              <span className="text-center">ナイスチャレンジ!</span>
              <span className="text-sm text-center text-black opacity-50"> 
                {"よく頑張りました！"} 
              </span>
            </div>
          </>
        ) : (
          <>
            <Trophy className="mr-4" stroke="brown" size={50} />
            <div className="flex flex-col text-2xl font-semibold text-center  text-yellow-800">
              <span className="">不合格です・・</span>
              <span className="text-sm text-center text-black opacity-50">
                {"もう少し頑張りましょう！"}
              </span>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default ResultsCard;