import { type ClassValue, clsx } from "clsx";
//tailwindcss のクラスを結合するためのライブラリ
import { twMerge } from "tailwind-merge";

// Tailwind CSSのクラスを結合する関数
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs)); // clsx は tailwind-merge に含まれる
}

// ミリ秒を受け取って、秒数に変換する関数
export function formatTimeDelta(seconds: number) {
  const hours = Math.floor(seconds / 3600); // 3600秒は1時間
  const minutes = Math.floor((seconds - hours * 3600) / 60); // 60秒は1分
  const secs = Math.floor(seconds - hours * 3600 - minutes * 60); // 60秒は1分
  const parts = []; // ここに時間、分、秒を追加していく
  if (hours > 0) { // 時間が1以上の場合は、時間を追加
    parts.push(`${hours}時間`);
  }
  if (minutes > 0) { // 分が1以上の場合は、分を追加
    parts.push(`${minutes}分`);
  }
  if (secs > 0) { // 秒が1以上の場合は、秒を追加
    parts.push(`${secs}秒`);
  }
  return parts.join(" "); // 配列を文字列に変換
}