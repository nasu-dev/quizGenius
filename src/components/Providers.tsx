"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

const queryClient = new QueryClient(); //クエリクライアントを作成

const Providers = ({ children }: ThemeProviderProps) => { //childrenを受け取る
  return (
    <QueryClientProvider client={queryClient}> {/* クエリクライアントを提供 */}
      <NextThemesProvider attribute="class" defaultTheme="system" enableSystem> {/* テーマプロバイダーを提供 */}
        <SessionProvider>{children}</SessionProvider> {/* セッションプロバイダーを提供 */}
      </NextThemesProvider> 
    </QueryClientProvider>
  );
};

export default Providers;
