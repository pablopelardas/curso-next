"use server";
import { Address } from "@/interfaces";
import prisma from "@/lib/prisma";

export const getUserAddress = async (
  userId: string
): Promise<Partial<Address>> => {
  try {
    const address = await prisma.userAddress.findUnique({
      where: {
        userId,
      },
    });
    if (!address) return {};
    const { countryId, address2, ...rest } = address;
    return {
      ...rest,
      country: countryId,
      address2: address2 ?? undefined,
    };
  } catch (error) {
    console.log(error);
    return {};
  }
};
