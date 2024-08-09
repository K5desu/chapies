import { GoogleGenerativeAI } from "@google/generative-ai";

const gemini = async (inputText: string) => {
  // URLパラメータ取得

  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY ?? "";

  // インスタンス生成
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const result = await model.generateContent(
    `


施設の提案をしてもらいます。以下の情報と例を元に私の入力内容に沿って施設を一つのみ提案してください。
まずは施設の情報を以下に記します。
施設名：steamコモンズ
説明：ものづくりができる場所。3Dプリンター、レーザーカッター、大型インクジェットプリンターなどを設置しており、（大型機械は予約必要）マイコンも貸し出ししているためIoTを用いたものづくりも経験できる。
施設名：グローバルラウンジ＆キッチン
説明：多言語を用いたイベントの開催、料理をテーマにしたイベントの開催。予約必要。
施設名：ファミマ
説明：ファミリーマート。生協電子マネー利用不可。お酒売ってない。
ここからは質問に対する回答の例です。以下の例に従って回答してください。

例1：IoT機器に触れラジコンを作りたい、3Dプリンターを使って入れ物を作りたい
回答：steamコモンズ

例2：料理を用いたイベントを開催したい
回答：グローバルラウンジ＆キッチン

例3：パンを買いたい。買い物がしたい
回答：ファミマ
では私の入力内容です。
${inputText}
よろしくお願いいたします。
   `
  );

  const response = await result.response;
  return response;
  // ここでresponseを使用する
};

export default gemini;
