import React from "react";
import { Progress } from "./ui/progress";
import Image from "next/image";

type Props = { finished: boolean };

const loadingTexts = [ //ローディングテキスト
  "クイズ生成中...",
  "好奇心の扉を開ける...",
  "無限の知識を探索する...",
  "問いかけの魔法を体験する...",
  "新しい知識の冒険に出発...",
];

const LoadingQuestions = ({ finished }: Props) => { //クイズローディング
  const [progress, setProgress] = React.useState(10); //プログレスバー
  const [loadingText, setLoadingText] = React.useState(loadingTexts[0]); //ローディングテキスト
  React.useEffect(() => {  //ローディングテキストの変更
    const interval = setInterval(() => { //インターバル
      let randomIndex = Math.floor(Math.random() * loadingTexts.length); //ランダムなインデックス
      setLoadingText(loadingTexts[randomIndex]); //2秒ごとにローディングテキストの変更
    }, 2000); 
    return () => clearInterval(interval); //インターバルのクリア
  }, []);

  React.useEffect(() => { //プログレスバーの変更
    const interval = setInterval(() => { 
      setProgress((prev) => { //2秒ごとにプログレスバーの変更
        if (finished) return 100; //終了したら100
        if (prev === 100) { //100になったら0
          return 0;
        }
        if (Math.random() < 0.1) { 
          return prev + 2;  //10%の確率で2増加
        }
        return prev + 0.5; //それ以外は0.5増加
      });
    }, 100);
    return () => clearInterval(interval); //インターバルのクリア
  }, [finished]); //終了したら100

  return (
    <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 w-[70vw] md:w-[60vw] flex flex-col items-center">
      <Image src={"/loading.gif"} width={400} height={400} alt="loading" /> {/* ローディングアイコン */}
      <Progress value={progress} className="w-full mt-4" /> {/* プログレスバー */}
      <h1 className="mt-2 text-xl">{loadingText}</h1> {/* ローディングテキスト */}
    </div>
  );
};

export default LoadingQuestions;