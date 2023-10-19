import React from "react";
import { Card } from "@/components/ui/card";
import { Percent, Target } from "lucide-react";

type Props = {
  percentage: number; //正答率
};

const OpenEndedPercentage = ({ percentage }: Props) => { //正答率を受け取る
  return (
    <Card className="flex flex-row items-center p-2"> 
      <Target size={30} /> 
      <span className="ml-3 text-2xl opacity-75">{percentage}</span>  /
      <Percent className="" size={25} />
    </Card>
  );
};

export default OpenEndedPercentage;