"use client";

import React from "react";
import { Button } from "./ui/button";
import { signIn } from "next-auth/react";

type Props = { text: string }; 

const SignInButton = ({ text }: Props) => { 
  return (
    <Button
      onClick={() => {
        // "google" プロバイダーを使用してサインインを試みる
        signIn("google").catch(console.error); // エラーが発生した場合にコンソールにエラーメッセージを出力
      }}
    >
      {text} {/* ボタンのテキストを表示 */}
    </Button>
  );
};

export default SignInButton;
