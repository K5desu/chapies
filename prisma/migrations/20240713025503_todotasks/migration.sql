-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "mail" TEXT NOT NULL,
    "owner" BOOLEAN NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "article" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "tags" TEXT NOT NULL,
    "campas" BOOLEAN NOT NULL,
    "img" TEXT NOT NULL,
    "userid" TEXT NOT NULL,

    CONSTRAINT "article_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "article" ADD CONSTRAINT "article_userid_fkey" FOREIGN KEY ("userid") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
