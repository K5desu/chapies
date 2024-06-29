"use server";
import * as line from "@line/bot-sdk";
export async function POST(request: Request) {
  const res = await request.json();
  const config = {
    channelAccessToken: process.env.CHANNEL_TOKEN || "",
    channelSecret: process.env.CHANNEL_SECRET || "",
  };

  if (config.channelAccessToken && config.channelSecret) {
    const client = new line.Client(config);
    try {
      await client.broadcast({
        type: "text",
        text: "新しい記事が作成されました",
      });
      return Response.redirect("/api/article", 200);
    } catch (e) {
      return Response.redirect("/api/article", 500);
    }
  }
}
