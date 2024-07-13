import { GoogleGenerativeAI } from "@google/generative-ai";

const gemini = async (inputText: string) => {
  // URLパラメータ取得

  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY ?? "";

  // インスタンス生成
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const result = await model.generateContent(
    `
施設の提案をしてもらいます。以下の情報と例を元に提案してください。
施設名：steamコモンズ
説明：ものづくりができる場所。3Dプリンター、レーザーカッター、大型インクジェットプリンターなどを設置しており、（大型機械は予約必要）マイコンも貸し出ししているためIoTを用いたものづくりも経験できる。
タグ：IT、文化部、サークル、部活、ボランティア

施設名：グローバルラウンジ＆キッチン
説明：多言語を用いたイベントの開催、料理をテーマにしたイベントの開催。予約必要。
タグ：言語、留学、文化部、サークル、部活

施設名：ファミリーマート龍谷大学店
説明：ファミリーマート。生協電子マネー利用不可。お酒売ってない。
タグ：コンビニ、スタバ、ラーメン

例1：ものづくりがしたい、IoTに触れたい
回答：steamコモンズがおすすめです。

例2：料理を用いたイベントを開催したい
回答：グローバルラウンジ＆キッチンがおすすめです。

例3：買い物がしたい

回答：ファミリーマート龍谷大学店がおすすめです。
${inputText}

 
   `
  );

  const response = await result.response;
  return response;
  // ここでresponseを使用する
};

export default gemini;
