"use server";

import prisma from "@/lib/prisma";
import { Product } from "@prisma/client";

interface PaginationOptions {
  page?: number;
  take?: number;
}

export const getPaginatedproducts = async ({
  page = 1,
  take = 12,
}: PaginationOptions) => {
  if (isNaN(Number(page))) page = 1;
  if (page < 1) page = 1;
  if (isNaN(Number(take))) take = 12;
  try {
    let products: Array<
      {
        ProductImage: {
          url: string;
        }[];
      } & Product
    > = [];
    let totalPages: number = 0;

    await Promise.all([
      prisma.product
        .count()
        .then((count) => (totalPages = Math.ceil(count / take))),
      prisma.product
        .findMany({
          skip: (page - 1) * take,
          take,
          include: {
            ProductImage: {
              take: 2,
              select: {
                url: true,
              },
            },
          },
        })
        .then((data) => (products = data)),
    ]);

    return {
      currentPage: page,
      totalPages,
      products: Array.isArray(products)
        ? products.map((product) => ({
            ...product,
            images: product.ProductImage.map((image) => image.url),
          }))
        : [],
    };
  } catch (error) {
    throw new Error("Error getting products");
  }
};
