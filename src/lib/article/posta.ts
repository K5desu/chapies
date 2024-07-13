"use server";
import * as line from "@line/bot-sdk";
import { config } from "@/lib/config";

export default async function POSTA(req: string) {
  if (config.channelAccessToken && config.channelSecret) {
    const client = new line.messagingApi.MessagingApiClient({
      channelAccessToken: config.channelAccessToken,
    });
    console.log(req);
    try {
      await client.broadcast({
        messages: [
          {
            type: "flex",
            altText: "This is a Flex Message",
            contents: {
              type: "bubble",
              hero: {
                type: "image",
                url: "https://lh6.googleusercontent.com/proxy/CNTIYcLDueUPOFa3q0HHITvuGbTBvsky-MfzskOEwpvdh_SwXqqAmdzlXxKQGOtah2o20DJUlrIiJpvbUHIqEoOMzo1-ol6W",
                size: "full",
                aspectRatio: "20:13",
                aspectMode: "cover",
                action: {
                  type: "uri",
                  uri: "https://line.me/",
                },
              },
              body: {
                type: "box",
                layout: "vertical",
                contents: [
                  {
                    type: "text",
                    text: req,
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
                      label: "CALL",
                      uri: "https://line.me/",
                    },
                  },
                  {
                    type: "button",
                    style: "link",
                    height: "sm",
                    action: {
                      type: "uri",
                      label: "WEBSITE",
                      uri: "https://line.me/",
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
      return "error";
    }
  }
}
