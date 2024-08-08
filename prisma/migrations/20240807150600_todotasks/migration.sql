-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "mail" TEXT NOT NULL,
    "instagram" TEXT,
    "X" TEXT,
    "github" TEXT,
    "name" TEXT,
    "comment" TEXT,
    "image" TEXT,
    "message" TEXT,

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
    "url" TEXT,
    "userid" TEXT NOT NULL,

    CONSTRAINT "article_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_mail_key" ON "user"("mail");

-- AddForeignKey
ALTER TABLE "article" ADD CONSTRAINT "article_userid_fkey" FOREIGN KEY ("userid") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
