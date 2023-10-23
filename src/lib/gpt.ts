import { Configuration, OpenAIApi } from "openai";

// OpenAI APIを初期化する
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// OpenAIを使って出力を生成する。
interface OutputFormat {
  [key: string]: string | string[] | OutputFormat;
}

// 出力フォーマットに基づいて、OpenAIを使って出力を生成する。
export async function strict_output(
  system_prompt: string,
  user_prompt: string | string[],
  output_format: OutputFormat,
  default_category: string = "",
  output_value_only: boolean = false,
  model: string = "gpt-3.5-turbo",
  temperature: number = 1,
  num_tries: number = 1,
  verbose: boolean = false
): Promise<
  {
    question: string;
    answer: string;
  }[]
> {
  //user_prompt がリスト形式（複数の要素からなるデータ）かどうかを示すブール型変数
  const list_input: boolean = Array.isArray(user_prompt);
  //output_format 内に動的要素（プレースホルダのようなもの）が存在するかどうかを示すブール型変数
  const dynamic_elements: boolean = /<.*?>/.test(JSON.stringify(output_format));
  //output_format 内にリスト形式の要素が存在するかどうかを確認するブール型変数
  const list_output: boolean = /\[.*?\]/.test(JSON.stringify(output_format));

  // エラーメッセージなしでスタート
  let error_msg: string = "";

  for (let i = 0; i < num_tries; i++) {
    // 出力フォーマットに<or>の動的要素が含まれている場合、動的要素を扱うようにプロンプトに追加する。
    let output_format_prompt: string = `\nYou are to output the following in json format: ${JSON.stringify(
      output_format
      // 出力フィールドに引用符やエスケープ文字を入れないでください。
    )}. \nDo not put quotation marks or escape character \\ in the output fields.`;

    if (list_output) {
      //出力フィールドがリストの場合、出力をリストの最適な要素に分類する。
      output_format_prompt += `\nIf output field is a list, classify output into the best element of the list.`;
    }

    // if output_format contains dynamic elements, process it accordingly
    if (dynamic_elements) {
      //と＞で囲まれたテキストは、それを置き換えるコンテンツを生成しなければならないことを示す。入力例 出力例： Go to the gardenn<と>で囲まれた出力キーは、置換するためにキー名を生成しなければならないことを示す。入力例 {<location>': '場所の説明'}, 出力例： {school：教育の場}`；
      output_format_prompt += `\nAny text enclosed by < and > indicates you must generate content to replace it. Example input: Go to <location>, Example output: Go to the garden\nAny output key containing < and > indicates you must generate the key name to replace it. Example input: {'<location>': 'description of location'}, Example output: {school: a place for education}`;
    }

    // 入力がリスト形式であれば、jsonをリスト形式で生成するように要求する。
    if (list_input) {
      output_format_prompt += `\nGenerate a list of json, one json for each input element.`; //各入力要素に対して1つのjsonを生成する。
    }

    // OpenAIを使ってレスポンスを得る
    const response = await openai.createChatCompletion({
      temperature: temperature, //温度は、出力の多様性を制御するために使用される。温度が高いほど、出力はより多様になる。温度が低いほど、出力はより予測可能になる。
      model: model, //モデルは、OpenAIが使用するGPTのバージョンを指定する。これは、GPT-3のバージョンを指定する。
      messages: [
        //メッセージは、OpenAIによって生成された応答を生成するために使用される。メッセージは、ユーザーとシステムの対話をシミュレートするために使用される。
        {
          role: "system",
          content: system_prompt + output_format_prompt + error_msg,
        },
        { role: "user", content: user_prompt.toString() },
      ],
    });
    console.log("openai.createChatCompletion called");

    let res: string =
      // OpenAI API からの応答データから、1つ目の選択肢のメッセージのコンテンツ（テキスト）を取得。
      // このテキスト内のアポストロフィ（'）をダブルクォート（"）に置換。
      response.data.choices[0].message?.content?.replace(/'/g, '"') ?? "";
    // テキスト内の特定のパターン（単語内にあるダブルクォート）を見つけて、それらをシングルクォート（'）に置換。
    //テキスト内でダブルクォートをエスケープしたい場合に役立つ
    res = res.replace(/(\w)"(\w)/g, "$1'$2");

    // OpenAI APIからの応答データから、1つ目の選択肢のメッセージのコンテンツ（テキスト）を取得。
    if (verbose) { //冗長モードが有効な場合、システムプロンプト、ユーザープロンプト、エラーメッセージ、およびGPTの応答を出力する。
      console.log(
        "System prompt:",
        system_prompt + output_format_prompt + error_msg
      );
      console.log("\nUser prompt:", user_prompt);
      console.log("\nGPT response:", res);
    }

    // try-catchブロックで出力形式が守られていることを確認する。
    try {
      let output: any = JSON.parse(res);

      if (list_input) {
        if (!Array.isArray(output)) {
          throw new Error("Output format not in a list of json 1");
        }
      } else {
        output = [output];
      }

      // output_listの各要素について、フォーマットが正しく守られているかチェックする。
      for (let index = 0; index < output.length; index++) {
        for (const key in output_format) {
          // ダイナミック出力ヘッダの精度を保証できないため、スキップする。
          if (/<.*?>/.test(key)) {
            continue;
          }

          // 出力フィールドがない場合、エラーを発生させる
          if (!(key in output[index])) {
            throw new Error(`${key} not in json output 2`);
          }

          // 単語リストの選択肢の1つが未知語であることを確認する。
          if (Array.isArray(output_format[key])) {
            const choices = output_format[key] as string[];
            // 出力がリストでないことを確認する
            if (Array.isArray(output[index][key])) {
              output[index][key] = output[index][key][0];
            }
            // GPTがカテゴリーを特定できない場合、デフォルトのカテゴリーを出力します。
            if (!choices.includes(output[index][key]) && default_category) {
              output[index][key] = default_category;
            }
            // 出力が説明書式であれば、ラベルのみを取得する。
            if (output[index][key].includes(":")) {
              output[index][key] = output[index][key].split(":")[0];
            }
          }
        }

        // 出力の値だけが欲しい場合
        if (output_value_only) {
          output[index] = Object.values(output[index]);
          // 要素が1つしかない場合は、リストなしで出力する。
          if (output[index].length === 1) {
            output[index] = output[index][0];
          }
        }
      }

      return list_input ? output : output[0];
    } catch (e) {
      //出力形式が正しくない場合、エラーメッセージを生成する。
      error_msg = `\n\nResult: ${res}\n\nError message: ${e}`;
      // console.log("An exception occurred:", e);
      console.log("Current invalid json format: 3", res);
    }
  }

  return [];
}
