import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
async function init() {
  const appOfficial = await prisma.user.create({
    data: {
      mail: "example@example.com",
      owner: true,
      article: {
        create: [
          {
            content: "記事の内容",
            tags: "食事",
            campas: true,
            title: "記事のタイトル",
            img: "https://up-j.shigaku.go.jp/photo/00000000504501000/0_20210611151621.png",
          },
        ],
      },
    },
  });

  console.log({ appOfficial });
}

init()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
