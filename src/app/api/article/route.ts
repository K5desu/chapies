import prisma from "@/lib/prisma";
import POSTA from "@/lib/article/posta";
export async function POST(request: Request) {
  const req = await request.json();
  const { mail, content, tags, campas, title, img } = req;
  try {
    await POSTA(title);
    const article = await prisma.user.create({
      data: {
        mail: mail,
        owner: true,
        article: {
          create: [
            {
              content: content,
              tags: tags,
              campas: campas,
              title: title,
              img: img,
            },
          ],
        },
      },
    });
    console.log("Article created:", article);
  } catch (error) {
    console.error("Error creating article:", error);
  }
  return Response.json({ status: "ok" });
}
