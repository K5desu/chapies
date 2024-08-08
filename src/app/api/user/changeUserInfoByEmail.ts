"use server";
import prisma from "@/lib/prisma";

export default async function updateUserInfoByEmail(
  mail: string,
  newUsername: string,
  newUsermessage: string,
  newUserInstagram: string,
  newUserX: string,
  newUsergithub: string
) {
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
        name: newUsername,
        message: newUsermessage,
        instagram: newUserInstagram,
        X: newUserX,
        github: newUsergithub,
      },
    });

    return updatedUser;
  } catch (error) {
    console.error("Error updating username:", error);
    throw error;
  }
}
