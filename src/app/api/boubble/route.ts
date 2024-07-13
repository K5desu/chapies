import gemini from "@/lib/geminiTagAdd";

export async function GET(request: Request) {
  const req = await request.json();

  const response = await gemini(req);
  return Response.json({ response });
}
