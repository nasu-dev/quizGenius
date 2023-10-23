import HistoryComponent from "@/components/HistoryComponent";
import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Home, LucideLayoutDashboard, XCircle } from "lucide-react";

type Props = {};

const History = async (props: Props) => {
  const session = await getAuthSession();
  if (!session?.user) {
    return redirect("/");
  }
  return (
    <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 w-2/3 md:w-1/3 mt-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold">履歴一覧</CardTitle>
            <Link className={buttonVariants({variant: "link"})} href="/dashboard">
              <XCircle className="mx-0"/>
            </Link>
          </div>
        </CardHeader>
        <CardContent className="max-h-[67vh] overflow-scroll ml-8 hidden-scrollbar">
          <HistoryComponent limit={100} userId={session.user.id} />
        </CardContent>
      </Card>
    </div>
  );
};

export default History;
