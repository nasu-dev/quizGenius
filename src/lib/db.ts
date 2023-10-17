// PrismaClientをインポート
import { PrismaClient } from "@prisma/client";

// "server-only" モジュールをインポート
import "server-only";

// グローバルスコープに PrismaClient のインスタンスを宣言
declare global {
  // グローバルスコープに cachedPrisma 変数を宣言
  var cachedPrisma: PrismaClient;
}

// PrismaClient のインスタンスをエクスポート
export let prisma: PrismaClient;
// 環境変数 NODE_ENV の値に基づいて PrismaClient のインスタンスを設定
if (process.env.NODE_ENV === "production") {
  // 本番環境では新しい PrismaClient のインスタンスを作成
  prisma = new PrismaClient();
} else {
  // 開発環境では cachedPrisma が存在しない場合に新しい PrismaClient のインスタンスを作成
  if (!global.cachedPrisma) {
    global.cachedPrisma = new PrismaClient();
  }
  // PrismaClient のインスタンスを cachedPrisma から取得
  prisma = global.cachedPrisma;
}
