import postLine from "@/lib/article/postLine";
export async function POST(request: Request) {
  const req = await request.json();
  const { mail, content, tags, campas, title, img } = req;
  try {
    await postLine(title);
  } catch (error) {
    console.error("Error creating article:", error);
  }
  return Response.json({ status: "ok" });
}
