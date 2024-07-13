import gemini from "@/lib/geminiTagAdd";

export async function GET(request: Request) {
  const response = await gemini("test");
  return Response.json({ response });
}
export async function POST(request: Request) {
  const req = await request.json();
  console.log(req);
  const response = await gemini(req);
  return Response.json({ response });
}
