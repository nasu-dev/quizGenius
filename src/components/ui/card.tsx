import * as React from "react"

import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-xl border bg-card text-card-foreground shadow", 
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef< //カードヘッダー
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)} //縦方向にスペースを空ける
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef< //カードタイトル
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("font-semibold leading-none tracking-tight", className)} //フォントの太さ、行間、文字間隔
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)} //フォントサイズ、色
    {...props}
  />
))
CardDescription.displayName = "CardDescription" //カード詳細

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-4 pt-0", className)} {...props} /> //縦方向にスペースを空ける
))
CardContent.displayName = "CardContent" //カード本文

const CardFooter = React.forwardRef< //カードフッター 
  HTMLDivElement,  
  React.HTMLAttributes<HTMLDivElement> 
>(({ className, ...props }, ref) => (  
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)} //縦方向にスペースを空ける
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } 
