import gemini from "@/lib/gemini";

export async function POST(request: Request) {
  const res = await request.json();
  const response = await gemini(res.text);

  return new Response(JSON.stringify(response), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
