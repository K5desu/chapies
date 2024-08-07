"use server";
import prisma from "@/lib/prisma";

async function createArticleByEmail(
  mail: string,
  title: string,
  content: string,
  tags: string,
  campas: boolean,
  img: string,
  url: string
) {
  try {
    // Find the user based on the email
    const user = await prisma.user.findUnique({
      where: {
        mail: mail,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    // Create the article using the user's ID
    const article = await prisma.article.create({
      data: {
        title: title,
        content: content,
        tags: tags,
        campas: campas,
        img: img,
        url: url,
        userid: user.id,
      },
    });

    return article;
  } catch (error) {
    throw new Error("Error creating article:");
  }
}

export default createArticleByEmail;
