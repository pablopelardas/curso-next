"use server";
import prisma from "@/lib/prisma";

export const removeUserAddress = async (userId: string) => {
  try {
    const address = await prisma.userAddress.delete({
      where: {
        userId,
      },
    });
    return {
      ok: true,
      message: "User address removed",
      address,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "Error removing user address",
    };
  }
};
