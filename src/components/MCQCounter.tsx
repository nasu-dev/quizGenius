import React from "react";
import { Card } from "@/components/ui/card";
import { CheckCircle2, XCircle } from "lucide-react";
import { Separator } from "@radix-ui/react-separator";

type Props = {
  correct_answers: number; //正解数
  wrong_answers: number; //不正解数
};

const MCQCounter = ({ correct_answers, wrong_answers }: Props) => {
  return (
    <Card className="flex flex-row items-center justify-center p-2"> {/* カード */}
      <CheckCircle2 color="green" size={30} /> {/* 正解アイコン */}
      <span className="mx-3 text-2xl text-[green]">{correct_answers}</span> {/* 正解数 */}

      <Separator orientation="vertical" /> {/* 縦線 */}

      <span className="mx-3 text-2xl text-[red]">{wrong_answers}</span> {/* 不正解数 */}
      <XCircle color="red" size={30} /> {/* 不正解アイコン */}
    </Card> 
  );
};

export default MCQCounter;
