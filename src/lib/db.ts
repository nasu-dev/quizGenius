import { PrismaClient } from "@prisma/client";

// 以下の import は、サーバー側でのみ実行される
import "server-only";


declare global {
  var cachedPrisma: PrismaClient;  // グローバル変数の型定義
}

export let prisma: PrismaClient;   // グローバル変数の宣言

if (process.env.NODE_ENV === "production") {  
  // 本番環境では、常に新しい PrismaClient インスタンスを作成
  prisma = new PrismaClient(); 
} else { 
  // 開発環境では、グローバル変数に PrismaClient インスタンスをキャッシュ
  if (!global.cachedPrisma) {
    global.cachedPrisma = new PrismaClient();
  }
  prisma = global.cachedPrisma; 
}
