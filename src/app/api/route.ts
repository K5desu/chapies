import gemini from "@/lib/geminiFacilitySuggestion";
import * as line from "@line/bot-sdk";
import { config } from "@/lib/config";
import postLine from "@/lib/article/postLine";
export async function POST(request: Request) {
  const req = await request.json();

  const client = new line.messagingApi.MessagingApiClient({
    channelAccessToken: config.channelAccessToken,
  });
  try {
    await Promise.all(
      (req.events || []).map((event: any) =>
        (async () => {
          await client.showLoadingAnimation({
            chatId: event.source.userId,
            loadingSeconds: 40,
          });
          switch (event.type) {
            case "message": {
              const response = await gemini(event.message.text);

              try {
                if (
                  response.candidates &&
                  response.candidates &&
                  response.candidates[0].content.parts[0] &&
                  response.candidates[0].content.parts[0].text
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

                  const parts =
                    response.candidates[0].content.parts[0].text.split(
                      "回答："
                    );
                  if (parts && parts[1]) {
                    await postLine(
                      parts[1],
                      "https://jkweuq9mjmmniepb.public.blob.vercel-storage.com/Horizoico-AKahOCg8GHB1C8LLWmz8ouhqTsvoF6.png",
                      "https://foggy-direction-f3b.notion.site/f85c7d52dfcc4f3fbc0ec9ddbea839d8?pvs=4",
                      "https://chapies.vercel.app/",
                      null
                    );
                  }
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
  } catch (e) {
    throw new Error("error");
  }
}
