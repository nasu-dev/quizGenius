# QuizGeuins

#### ☁️ デプロイ先URL: [QuizGeius](https://ai-quiz-genius.vercel.app)

<p></p>
<img width="1391" alt="スクリーンショット 2023-11-06 11 09 43" src="https://github.com/nasu-dev/quizGenius/assets/114811498/cdeb171c-c716-4dc3-9c43-d2990f71dd85">


</p>


<p></p>
<p></p>

---

## 🔍 目次

* [📌 プロジェクト概要](#overview)

* [📸 画面一覧](#pages)

* [🕹️ 機能一覧](#function)
  
* [💻 使用技術](#stack)

* [📝 ディレクトリ一覧](#project-structure)

* [📁 コードストラクチャー](#project-structure)
  
* [⚙️ セットアップ](#setting-up)

* [🚀 ローカルでの実行](#run-locally)

* [🙌 Contributors](#contributors)

---

## 📌 プロジェクト概要

#### アプリケーションについて
QuizGeniusuはchatGPT APIを用いた新しいAI×クイズ生成アプリケーションです。 </br>
好きなお題を入力すると、AIが瞬時に問題を生成し、あなただけの問題を出題します。
エンタメとしてクイズ楽しむのはもちろん、新しい知識のキャッチアップや教育現場など幅広い用途で価値を提供できるアプリケーションです。</br> 
日本語と英語でのゲームモードに対応。
</p>

#### 作成理由
自分の趣味である英語学習に役立つアプリケーションを何か作成してみたいと思ったのがきっかけです。既存の問題集や単語帳では決まった問題しか出題されず、退屈だと感じてしまうことがありました。ユーザーの嗜好にあわせてパーソナライズされる学習ツールがあれば、より楽しみながら飽きずに言語学習を続けられると考えました。


#### 苦労した点
問題生成機能の開発過程において、ChatGPTモデルのJSON出力に苦労し、アプリのクラッシュが繰り返し発生しました。
海外の開発者を参考にプロンプトを実装したものの、日本語モードの追加や仕様変更によって、変換処理が適切に行われていないことが原因でした。
ChatGPTモデルに自身の回答がJSON形式であるか再帰的にテストする処理を追加するなど、デバックを繰り返しながら機能改善に努めました。

#### 工夫点、よくできた点
全体を通して視覚的にユーザーに優しく、シンプルでモダンなUIに仕上げられたと思います。
Tailwind CSSの柔軟性や、Vercel社が提供しているshadCNという最新のUIライブラリに大きく助けられました。
shadCNは開発体験が非常に良く、今後も積極的に活用していきたいです。

---

## 📸 画面一覧

#### ログイン画面


#### ダッシュボード画面


#### クイズ生成画面


#### ゲームプレイ画面


#### 結果表示画面


#### 履歴一覧画面


#### ワードクラウド画面



---


## 💻 使用技術

### フロントエンド
- [React](https://reactjs.org/)
- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadCN UI](https://ui.shadcn.com/)

### バックエンド

- [NextAuth](https://next-auth.js.org/)
- [PlanetScale](https://planetscale.com/)
- [Prisma](https://prisma.io/)
- [axios](https://axios-http.com/)
- [react-query](https://react-query.tanstack.com/)
- [OpenAI](https://openai.com/)

### その他主要なライブラリ

- [lucide-react](https://lucide.dev/)
- [zod](https://github.com/colinhacks/zod)
- [budoux](https://github.com/google/budoux)
- [next-themes](https://github.com/pacocoursey/next-themes)


---


## 📝 ディレクトリ一覧

- [**src/app**](src/app): メインアプリケーションディレクトリ。 
- [**src/components**](src/components): UIコンポーネントを格納するディレクトリ。
- [**src/app/api**](src/app/api): 認証、ゲーム管理、クイズ問題管理などのAPI関連機能を処理するディレクトリ。
- [**src/app/dashboard**](src/app/dashboard): ダッシュボード画面をレンダリングするディレクトリ。
- [**src/app/play**](src/app/play): ゲームプレイ画面を管理するディレクトリ。日本語ベースと英語ベースのゲームモードを含む。
- [**src/components/forms**](src/components/forms): データ入力と送信のためのフォーム関連ディレクトリ。
- [**src/app/statistics**](src/app/statistics):ゲーム結果画面の表示を処理するディレクトリ。
- [**src/components/ui**](src/components/ui): ボタン、カード、モーダルなどのUI関連コンポーネントを格納するディレクトリ。主にshadcn/UIからインストール。
- [**src/schemas**](src/schemas): アプリケーション全体のスキーマとデータ構造に関するディレクトリ。
- [**prisma**](prisma): Prismaのデータベーススキーマと設定ファイルに関するディレクトリ。

---

## 📁 コードストラクチャー

```bash
├── .eslintrc.json
├── .gitignore
├── README.md
├── components.json
├── next.config.js
├── package-lock.json
├── package.json
├── postcss.config.js
├── prisma
│   └── schema.prisma
├── public
│   ├── heroSection.svg
│   ├── loading.gif
│   ├── next.svg
│   ├── nextauth.png
│   ├── nextjs.png
│   ├── openai.png
│   ├── planetscale.png
│   ├── prisma.png
│   ├── react-query.png
│   ├── tailwind.png
│   ├── trpc.png
│   ├── typescript.png
│   └── vercel.svg
├── src
│   ├── app
│   │   ├── api
│   │   │   ├── auth
│   │   │   │   └── [...nextauth]
│   │   │   │       └── route.ts
│   │   │   ├── checkAnswer
│   │   │   │   └── route.ts
│   │   │   ├── endGame
│   │   │   │   └── route.ts
│   │   │   ├── game
│   │   │   │   └── route.ts
│   │   │   └── questions
│   │   │       └── route.ts
│   │   ├── dashboard
│   │   │   └── page.tsx
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── history
│   │   │   └── page.tsx
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── play
│   │   │   ├── open-end
│   │   │   │   └── [gameId]
│   │   │   │       └── page.tsx
│   │   │   └── question
│   │   │       └── [gameId]
│   │   │           └── page.tsx
│   │   ├── quiz
│   │   │   └── page.tsx
│   │   └── statistics
│   │       └── [gameId]
│   │           └── page.tsx
│   ├── components
│   │   ├── BlankAnswerInput.tsx
│   │   ├── DetailsDialog.tsx
│   │   ├── HeroLanding.tsx
│   │   ├── HistoryComponent.tsx
│   │   ├── LoadingQuestions.tsx
│   │   ├── Navbar.tsx
│   │   ├── Providers.tsx
│   │   ├── QuestionCounter.tsx
│   │   ├── QustionCreation.tsx
│   │   ├── SignInButton.tsx
│   │   ├── ThemeToggle.tsx
│   │   ├── UserAccountNav.tsx
│   │   ├── UserAvatar.tsx
│   │   ├── WordCloud.tsx
│   │   ├── dashboard
│   │   │   ├── HistoryCard.tsx
│   │   │   ├── HotTopicsCard.tsx
│   │   │   ├── QuizMeCard.tsx
│   │   │   └── RecentActivityCard.tsx
│   │   ├── footer.tsx
│   │   ├── forms
│   │   │   └── QuizCreation.tsx
│   │   ├── statistics
│   │   │   ├── AccuracyCard.tsx
│   │   │   ├── QuestionsList.tsx
│   │   │   ├── ResultsCard.tsx
│   │   │   └── TimeTakenCard.tsx
│   │   └── ui
│   │       ├── avatar.tsx
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── dialog.tsx
│   │       ├── dropdown-menu.tsx
│   │       ├── form.tsx
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       ├── navigation-menu.tsx
│   │       ├── progress.tsx
│   │       ├── separator.tsx
│   │       ├── table.tsx
│   │       ├── toast.tsx
│   │       ├── toaster.tsx
│   │       └── use-toast.ts
│   ├── lib
│   │   ├── db.ts
│   │   ├── gpt.ts
│   │   ├── nextauth.ts
│   │   ├── useBudouX.ts
│   │   └── utils.ts
│   └── schemas
│       ├── forms
│       │   └── quiz.ts
│       └── questions.ts
├── tailwind.config.ts
└── tsconfig.json
```
---

## ⚙️ セットアップ

#### Your Environment Variable

- Step 1

- Step 2

---

## 🚀 ローカルでの実行
1.Clone the quizGenius repository:
```sh
git clone https://github.com/nasu-dev/quizGenius
```
2.Install the dependencies with one of the package managers listed below:
```bash
pnpm install
bun install
npm install
yarn install
```
3.Start the development mode:
```bash
pnpm dev
bun dev
npm run dev
yarn dev
```
---

## 🙌 Contributors
<a href="https://github.com/nasu-dev/quizGenius/graphs/contributors">
<img src="https://contrib.rocks/image?repo=nasu-dev/quizGenius" />
</a>

