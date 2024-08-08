"use server";
import gemini from "@/lib/geminiFacilitySuggestion";
export default async function replyai(text: string) {
  try {
    const reply = await gemini(text);
    if (
      reply.candidates &&
      reply.candidates &&
      reply.candidates[0].content.parts[0] &&
      reply.candidates[0].content.parts[0].text
    ) {
      const parts = reply.candidates[0].content.parts[0].text.split("回答：");
      return parts[1];
    }

    return reply;
  } catch (error) {
    return "該当する施設がありません";
  }
}
