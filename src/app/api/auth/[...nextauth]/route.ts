import { authOptions } from "@/src/lib/nextauth";
import NextAuth from "next-auth/next";

// 提供された認証オプションを使用して、NextAuth ハンドラを作成します。
const handler = NextAuth(authOptions);

// GET および POST リクエストの両方に対して NextAuth ハンドラをエクスポートします。
export { handler as GET, handler as POST };
