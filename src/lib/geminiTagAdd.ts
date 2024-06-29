import { GoogleGenerativeAI } from "@google/generative-ai";

const gemini = async (inputText: string) => {
  // URLパラメータ取得

  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY ?? "";

  // インスタンス生成
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const result = await model.generateContent(
    `${inputText}の内容に基づいて以下のものから適切なものを一つ選んでください
    1. 教育
    2.交通機関
    3.部活
    4.食事
    5.リラックス
    6.その他
    
   `
  );

  const response = await result.response;
  return response;
  // ここでresponseを使用する
};

export default gemini;
