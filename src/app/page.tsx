import SignInButton from "@/components/SignInButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession();
  if (session?.user) {
    redirect("/dashboard");
  }
  return (
    <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-xl">QuizGeniusへようこそ🔥</CardTitle>
          <CardDescription>
            QuizGeniusはChatGPTを用いたAIクイズ自動生成プラットフォームです。早速ログインボタンから始めましょう!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignInButton text="Sign In with Google" />
        </CardContent>
      </Card>
    </div>
  );
}
