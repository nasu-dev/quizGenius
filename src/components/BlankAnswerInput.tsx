import React from "react";
import keyword_extractor from "keyword-extractor";


type Props = {
  answer: string;
  setBlankAnswer: React.Dispatch<React.SetStateAction<string>>;  // setBlankAnswer関数を受け取る
};

const blank = "_____";

const BlankAnswerInput = ({ answer, setBlankAnswer }: Props) => { // answerとsetBlankAnswerを受け取る
  const keywords = React.useMemo(() => {  // keywordsを計算
    const words = keyword_extractor.extract(answer, { // answerからキーワードを抽出
      language: "english", //日本語サポートなし
      remove_digits: true, //数字を削除
      return_changed_case: false, //大文字を小文字に変換しない
      remove_duplicates: false,  //重複を削除しない
    });

    const shuffled = words.sort(() => 0.5 - Math.random()); //キーワードをシャッフル
    return shuffled.slice(0, 2); //キーワードを2つ返す
  }, [answer]); //answerが変更された場合に再計算

  // answerWithBlanksは、answerのキーワードをブランクに置き換えた文字列
  const answerWithBlanks = React.useMemo(() => {
    const answerWithBlanks = keywords.reduce((acc, curr) => { 
      return acc.replaceAll(curr, blank);
    }, answer);
    // setBlankAnswer関数を呼び出して、answerWithBlanksを更新
    setBlankAnswer(answerWithBlanks);
    return answerWithBlanks;
  }, [answer, keywords, setBlankAnswer]); //answer, keywords, setBlankAnswerが変更された場合に再計算

  return (
    <div className="flex justify-start w-full mt-4">
      <h1 className="text-xl font-semibold">
        {/* replace the blanks with input elements */}
        {answerWithBlanks.split(blank).map((part, index) => { // answerWithBlanksをブランクで分割
          return (
            <React.Fragment key={index}>
               {part}  {/*ブランクの前の部分 */}
              {index === answerWithBlanks.split(blank).length - 1 ? (  // ブランクの後の部分
                ""
              ) : (
                <input
                  id="user-blank-input"
                  className="text-center border-b-2 border-black dark:border-white w-28 focus:border-2 focus:border-b-4 focus:outline-none"
                  type="text"
                />
              )}
            </React.Fragment>  // ブランクの後の部分
          );
        })}
      </h1>
    </div>
  );
};

export default BlankAnswerInput;