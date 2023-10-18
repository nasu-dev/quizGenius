import { z } from "zod";
// ZodはTypeScriptの型システムを活用し、データの形状や構造を静的にチェックすることが可能なライブラリです。
// これにより、APIからのレスポンスやユーザーからの入力など、アプリケーションで扱うデータが期待する形状であることを保証できます。

// getQuestionsSchema: クイズの質問を取得する際のスキーマ
export const getQuestionsSchema = z.object({
  topic: z.string(), // 質問のお題（文字列）
  amount: z.number().int().positive().min(1).max(10), // 質問の数（正の整数、1から10の範囲内）
  type: z.enum(["mcq", "open_ended"]), // 質問のタイプ（"mcq"または"open_ended"）
});

// checkAnswerSchema: ユーザーの回答をチェックする際のスキーマ
export const checkAnswerSchema = z.object({
  userInput: z.string(), // ユーザーの入力（文字列）
  questionId: z.string(), // 質問のID（文字列）
});

// endGameSchema: ゲームの終了を表す際のスキーマ
export const endGameSchema = z.object({
  gameId: z.string(), // ゲームのID（文字列）
});
