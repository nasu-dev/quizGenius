"use client";
import React from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Question } from "@prisma/client";

type Props = {
  questions: Question[]; //クイズの問題と解答
};

const QuestionsList = ({ questions }: Props) => { //クイズの問題と解答を表示
  return (
    <Table className="mt-4"> {/* テーブル */}
      <TableCaption>End of list.</TableCaption> {/* テーブルのキャプション */}
      <TableHeader> {/* テーブルヘッダー */}
        <TableRow> {/* テーブル行 */}
          <TableHead className="w-[10px]">No.</TableHead> {/* テーブルヘッダー */}
          <TableHead>問題と解答</TableHead> 
          <TableHead>あなたの回答</TableHead>

          {/* {questions[0].questionType === "open_ended" && ( //問題の種類がopen_endedの場合
            <TableHead className="w-[10px] text-right">正答率</TableHead> //テーブルヘッダー
          )} */}
        </TableRow>
      </TableHeader>
      <TableBody>
        <>
          {questions.map( 
            (
              { answer, question, userAnswer, percentageCorrect, isCorrect }, //問題と解答、ユーザーの回答、正確性、正解かどうか
              index 
            ) => {
              return (
                <TableRow key={index}> 
                  <TableCell className="font-medium">{index + 1}</TableCell> {/* 問題番号 */}
                  <TableCell>
                    {question} <br /> {/* 問題 */}
                    <br />
                    <span className="font-semibold">{answer}</span> {/* 解答 */}
                  </TableCell>
                    <TableCell
                      className={`${
                        isCorrect ? "text-green-600" : "text-red-600"
                      } font-semibold`}
                    >
                      {userAnswer} {/* ユーザーの回答 */}
                    </TableCell>
                </TableRow>
              );
            }
          )}
        </>
      </TableBody>
    </Table>
  );
};

export default QuestionsList;