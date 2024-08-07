"use server";
import prisma from "@/lib/prisma";

async function createUser(email: string, image: string) {
  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: {
        mail: email,
      },
    });

    if (existingUser) {
      return existingUser;
    }

    // If user does not exist, create a new one
    const user = await prisma.user.create({
      data: {
        mail: email,
        image: image,
      },
    });

    return user;
  } catch (error) {
    throw new Error(`Error creating user: ${error}`);
  }
}

export default createUser;
