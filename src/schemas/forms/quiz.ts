import { z } from "zod";

// クイズ作成のためのスキーマ
export const quizCreationSchema = z.object({
  // お題（テーマ）のスキーマ
  topic: z
    .string()
    .min(3, {
      message: "お題はワードで入力してください",
    })
    .max(50, {
      message: "お題は50文字以下で入力してください",
    }),

  // クイズタイプのスキーマ
  type: z.enum(["mcq", "open_ended"]), // クイズタイプは "mcq" または "open_ended" のいずれかである必要があります

  // クイズの問題数のスキーマ
  amount: z.number().min(1).max(10), // 問題数は1から10の範囲内である必要があります
});
