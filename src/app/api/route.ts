import gemini from "@/lib/geminiTagAdd";
import * as line from "@line/bot-sdk";
export async function POST(request: Request) {
  const req = await request.json();

  const config = {
    channelAccessToken: process.env.CHANNEL_TOKEN || "",
    channelSecret: process.env.CHANNEL_SECRET || "",
  };
  const client = new line.messagingApi.MessagingApiClient({
    channelAccessToken: config.channelAccessToken,
  });

  await Promise.all(
    (req.events || []).map((event: any) =>
      (async () => {
        await client.showLoadingAnimation({
          chatId: "U8bcfd6d1846b2d3c55f31cff57ec3737",
          loadingSeconds: 40,
        });
        switch (event.type) {
          case "message": {
            const response = await gemini(event.message.text);

            try {
              if (
                response.candidates &&
                response.candidates &&
                response.candidates[0].content.parts[0]
              ) {
                // `response`変数に直接文字列を設定

                const messages: { type: "text"; text: string }[] = [
                  {
                    type: "text",
                    text: response.candidates[0].content.parts[0].text || "",
                  },
                ];

                await client.replyMessage({
                  replyToken: event.replyToken,
                  messages: messages,
                });
              }

              return Response.json({ response });
            } catch (e) {
              return Response.json({ error: e });
            }
          }
        }
      })()
    )
  );
  return Response.json({ status: "ok" });
}
