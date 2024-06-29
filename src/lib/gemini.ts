import { GoogleGenerativeAI } from "@google/generative-ai";

const gemini = async (inputText: string) => {
  // URLパラメータ取得

  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY ?? "";

  // インスタンス生成
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const result = await model.generateContent(
    `${inputText}にtitleを付けたいのでできるだけ簡潔に要約して
   `
  );

  const response = await result.response;
  return response;
  // ここでresponseを使用する
};

export default gemini;
