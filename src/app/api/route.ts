import gemini from "@/lib/gemini";
import * as line from "@line/bot-sdk";
export async function POST(request: Request) {
  const res = await request.json();

  const config = {
    channelAccessToken:
      "GGN5dtFVW0Vm2IfeTk3XNKXgbdZmd1ODbgJN2O/o0z/hbEmOtWKvq4m00q9cvzPCxwrvOh++HOVRdx4oSBnM4Sm7khq/rtVZzsewKWl7LnnMyk40Olrq43XoB0QcGxgGTnnMZx5GngkjM5T7O3x+dAdB04t89/1O/w1cDnyilFU=",
    channelSecret: "ac68c26537a8764ae8af478bb1bab28c",
  };

  const client = new line.Client(config);
  await Promise.all(
    (res.events || []).map((event: any) =>
      (async () => {
        switch (event.type) {
          case "message": {
            const response = await gemini(event.message.text);
            console.log(event.message.text);
            try {
              console.log("response", response);
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
                await client.replyMessage(event.replyToken, messages);
                await client.broadcast(event.message.text);
                console.log("message", messages);
              }

              return new Response(JSON.stringify(response), {
                headers: {
                  "Content-Type": "application/json",
                },
              });
            } catch (e) {
              return new Response(JSON.stringify(e), {
                headers: {
                  "Content-Type": "application/json",
                },
              });
            }
          }
        }
      })()
    )
  );
  return new Response("OK", {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
