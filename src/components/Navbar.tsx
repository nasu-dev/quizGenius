import Link from "next/link";
import React from "react";

import UserAccountNav from "./UserAccountNav";
import { ThemeToggle } from "./ThemeToggle";
import { getAuthSession } from "@/lib/nextauth";
import SignInButton from "./SignInButton";
import DetailsDialog from "./DetailsDialog";
import { LogIn } from "lucide-react";

const Navbar = async () => {
  const session = await getAuthSession(); //認証情報を取得
  return (
    <div className="fixed inset-x-0 top-0 bg-white dark:bg-gray-950 z-[10] border-b border-zinc-300 py-4 md:py-2">
      {" "}
      {/* ナビゲーションバー */}
      <div className="flex items-center justify-between h-full gap-2 px-4 md:px-8 mx-auto max-w-7xl">
        {/* Logo */}
        <Link href={"/"} className="flex items-center gap-2">
          <p className="rounded-xl border-2 border-b-4 border-r-4 border-slate-700 dark:from-slate-200 dark:to-slate-400 px-2 py-1 text-xl font-bold transition-all hover:-translate-y-[2px] md:block  dark:border-white bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
            QuizGenius
          </p>
        </Link>
        <div className="flex items-center gap-0 md:gap-2">
          <DetailsDialog /> {/* 詳細ダイアログ */}
          <ThemeToggle className="mx-4" /> {/* テーマトグル */}
          {session?.user ? (
            <UserAccountNav user={session.user} /> //ユーザーアカウントナビゲーション
          ) : (
            <div>
            <div className="hidden md:inline ">
              <SignInButton text={"ログイン"} />
            </div>
            <div className="md:hidden">
              <LogIn />
            </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
