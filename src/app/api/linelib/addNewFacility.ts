"use server";
import * as line from "@line/bot-sdk";
export async function addNewFacility(text: string) {
  const config = {
    channelAccessToken: process.env.CHANNEL_TOKEN || "",
    channelSecret: process.env.CHANNEL_SECRET || "",
  };

  if (config.channelAccessToken && config.channelSecret) {
    const client = new line.Client(config);
    try {
      await client.broadcast({ type: "text", text });
      return "OK";
    } catch (e) {
      return e;
    }
  }
}
