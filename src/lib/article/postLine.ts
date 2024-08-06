"use server";
import * as line from "@line/bot-sdk";
import { config } from "@/lib/config";

export default async function postLine(
  title: string,
  imgurl: string,
  articleUrl: string,
  websiteUrl: string,
  action: string | null
) {
  if (config.channelAccessToken && config.channelSecret) {
    const client = new line.messagingApi.MessagingApiClient({
      channelAccessToken: config.channelAccessToken,
    });
    try {
      if (action) {
        await client.broadcast({
          messages: [
            {
              type: "text",
              text: "新しい記事が投稿されました",
            },
          ],
        });
      }

      await client.broadcast({
        messages: [
          {
            type: "flex",
            altText: "This is a Flex Message",
            contents: {
              type: "bubble",
              hero: {
                type: "image",
                url: imgurl,
                size: "full",
                aspectRatio: "20:13",
                aspectMode: "cover",
                action: {
                  type: "uri",
                  uri: articleUrl,
                },
              },
              body: {
                type: "box",
                layout: "vertical",
                contents: [
                  {
                    type: "text",
                    text: title,
                    weight: "bold",
                    size: "xl",
                  },
                ],
              },
              footer: {
                type: "box",
                layout: "vertical",
                spacing: "sm",
                contents: [
                  {
                    type: "button",
                    style: "link",
                    height: "sm",
                    action: {
                      type: "uri",
                      label: "Webサイトを見る",
                      uri: articleUrl,
                    },
                  },
                  {
                    type: "box",
                    layout: "vertical",
                    contents: [],
                    margin: "sm",
                  },
                ],
                flex: 0,
              },
            },
          },
        ],
      });
      return "ok";
    } catch (e) {
      throw new Error("Error");
    }
  }
}
