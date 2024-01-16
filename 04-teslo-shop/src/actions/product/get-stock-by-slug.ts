"use server";

import prisma from "@/lib/prisma";

export const getStockBySlug = async (slug: string): Promise<number> => {
  const product = await prisma.product.findFirst({
    where: {
      slug,
    },
    select: {
      inStock: true,
    },
  });
  return product?.inStock ?? 0;
};
