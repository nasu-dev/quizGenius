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
    <div className="flex-row justify-center items-center mx-auto">
     <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        QuizGeniusへようこそ
        </h1>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        QuizGeniusはQuizGeniusは最新AI技術を駆使したAIクイズ自動生成プラットフォームです。さっそく始めましょう!
      </p>
          <SignInButton text="無料で始める" />
    </div>


  //   <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 md:px-12 lg:px-24 lg:py-24">
  //   <div className="flex flex-wrap items-center mx-auto max-w-7xl">
  //     <div className="w-full lg:max-w-lg lg:w-1/2 rounded-xl">
  //       <div>
  //         <div className="relative w-full max-w-lg">
  //           <div className="absolute top-0 rounded-full bg-violet-300 -left-4 w-72 h-72 mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>

  //           <div className="absolute rounded-full bg-fuchsia-300 -bottom-24 right-20 w-72 h-72 mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
  //           <div className="relative">
  //             {/* <img className="object-cover object-center mx-auto rounded-lg shadow-2xl" alt="hero" src="/assets/images/placeholders/squareCard.png"> */}
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //     <div className="flex flex-col items-start mt-12 mb-16 text-left lg:flex-grow lg:w-1/2 lg:pl-6 xl:pl-24 md:mb-0 xl:mt-0">
  //       <span className="mb-8 text-xs font-bold tracking-widest text-blue-600 uppercase"> Your tagline </span>
  //       <h1 className="mb-8 text-4xl font-bold leading-none tracking-tighter text-neutral-600 md:text-7xl lg:text-5xl">QuizGenius</h1>
  //       <p className="mb-8 text-base leading-relaxed text-left text-gray-500"> QuizGeniusはQuizGeniusは最新AI技術を駆使した<br/>AIクイズ自動生成プラットフォームです。<br/>さっそく始めましょう!</p>
  //       <div className="mt-0 lg:mt-6 max-w-7xl sm:flex">
  //         <div className="mt-3 rounded-lg sm:mt-0">
  //           <button className="items-center block px-10 py-4 text-base font-medium text-center text-white transition duration-500 ease-in-out transform bg-blue-600 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">サインイン</button>
  //         </div>
  //         <div className="mt-3 rounded-lg sm:mt-0 sm:ml-3">
  //           <button className="items-center block px-10 py-3.5 text-base font-medium text-center text-blue-600 transition duration-500 ease-in-out transform border-2 border-white shadow-md rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">無料で試す</button>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // </div>
  );
}
