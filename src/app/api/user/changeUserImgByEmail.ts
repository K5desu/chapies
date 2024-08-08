"use server";
import prisma from "@/lib/prisma";
export default async function changeUserImgByEmail(mail: string, img: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        mail: mail,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const updatedUser = await prisma.user.update({
      where: {
        mail: mail,
      },
      data: {
        image: img,
      },
    });

    return updatedUser;
  } catch (error) {
    console.error("Error updating user image:", error);
    throw error;
  }
}
