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
      console.log("User already exists:", existingUser);
      return existingUser;
    }

    // If user does not exist, create a new one
    const user = await prisma.user.create({
      data: {
        mail: email,
        image: image,
      },
    });

    console.log("User created:", user);
    return user;
  } catch (error) {
    console.error("Error creating user:", error);
  }
}

export default createUser;
