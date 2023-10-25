import { PrismaAdapter } from "@next-auth/prisma-adapter";
import {
  getServerSession,
  type NextAuthOptions,
  type DefaultSession,
} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "@/lib/db";

declare module "next-auth" {
  interface Session extends DefaultSession {
    // セッションに追加する情報の型定義
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"]; // 既存の user プロパティを拡張
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

declare module "next-auth/jwt" {
  // JWT の型定義
  interface JWT {
    id: string;
  }
}

export const authOptions: NextAuthOptions = {
  // NextAuth の設定
  session: {
    strategy: "jwt", // JWT を使ってセッションを管理
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    // JWT をデコードして、セッションに含める
    jwt: async ({ token }) => {
      // token には、Google から受け取ったトークンが含まれる
      const db_user = await prisma.user.findFirst({
        where: { 
          email: token?.email, // トークンからメールアドレスを取得
        },
      }); // データベースからユーザーを取得
      if (db_user) { // ユーザーが存在する場合は、トークンに id を追加
        token.id = db_user.id; 
      }
      return token; // トークンを返す
    },
    session: ({ session, token }) => { // セッションに含める情報を返す
      if (token) { // トークンが存在する場合は、セッションに追加
        session.user.id = token.id; 
        session.user.name = token.name; 
        session.user.email = token.email;
        session.user.image = token.picture;
      }
      return session;
    },
  },
  // プロバイダーの設定
  adapter: PrismaAdapter(prisma),  // PrismaAdapter を使って、データベースをセットアップ
  providers: [ // Google プロバイダーを追加
    GoogleProvider({ 
      clientId: process.env.GOOGLE_CLIENT_ID as string, 
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
};

// サーバーサイドでのみ実行される関数
export const getAuthSession = () => { 
  return getServerSession(authOptions); // getServerSession を使って、セッションを取得
};
