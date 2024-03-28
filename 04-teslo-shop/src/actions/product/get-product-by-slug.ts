"use server";

import prisma from "@/lib/prisma";

export const getProductBySlug = async (slug: string) => {
  try {
    const product = await prisma.product.findUnique({
      where: {
        slug,
      },
      include: {
        ProductImage: {
          select: {
            url: true,
            id: true,
          },
        },
      },
    });
    if (!product) return null;
    const { ProductImage, ...rest } = product;
    return {
      ...rest,
      images: ProductImage.map((image) => ({
        id: image.id,
        url: image.url,
      })),
    };
  } catch (error) {
    console.log(error);
    throw new Error("Error getting product by slug");
  }
};
