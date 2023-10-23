"use client";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import React from "react";
import D3WordCloud from "react-d3-cloud";

type Props = {
  formattedTopics: { text: string; value: number }[]; //トピック一覧
};

const fontSizeMapper = (word: { value: number }) =>  
  Math.log2(word.value) * 10 + 15; //フォントサイズ

const WordCloud = ({ formattedTopics }: Props) => { //ワードクラウド
  const theme = useTheme(); //テーマ
  const router = useRouter(); //ルーター

  // 最初の20個の単語を選択
  const limitedTopics = formattedTopics.slice(0, 30);
  return (
    <>
      <D3WordCloud
        data={limitedTopics} //トピック一覧
        height={400} //高さ
        font='Times New Roman, Times, serif'
        fontSize={fontSizeMapper} //フォントサイズ
        rotate={0} //回転
        padding={10} //パディング
        fill={theme.theme === "dark" ? "white" : "black"} //色
        onWordClick={(e, d) => { 
          router.push("/quiz?topic=" + d.text); //クイズページへのルーティング
        }}
      />
    </>
  );
};

export default WordCloud;
