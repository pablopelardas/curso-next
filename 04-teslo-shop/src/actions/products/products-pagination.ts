"use server";

import prisma from "@/lib/prisma";
import { Product } from "@prisma/client";

interface PaginationOptions {
  page?: number;
  take?: number;
  gender?: string;
}

export const getPaginatedproducts = async ({
  page = 1,
  take = 12,
  gender = "",
}: PaginationOptions) => {
  if (isNaN(Number(page))) page = 1;
  if (page < 1) page = 1;
  if (isNaN(Number(take))) take = 12;
  try {
    let products: Array<
      {
        ProductImage: {
          url: string;
          id: number;
        }[];
      } & Product
    > = [];
    let totalPages: number = 0;

    const filters: { where: { [key: string]: string } } = { where: {} };
    if (gender) {
      filters.where = {
        gender,
      };
    }

    await Promise.all([
      prisma.product
        .count({
          where: filters.where,
        })
        .then((count) => (totalPages = Math.ceil(count / take))),
      prisma.product
        .findMany({
          skip: (page - 1) * take,
          take,
          where: filters.where,
          include: {
            ProductImage: {
              take: 2,
              select: {
                url: true,
                id: true,
              },
            },
          },
        })
        .then((data) => (products = data)),
    ]);

    return {
      totalPages,
      products: Array.isArray(products)
        ? products.map((product) => ({
            ...product,
            images: product.ProductImage.map((image) => ({
              id: image.id,
              url: image.url,
            })),
          }))
        : [],
    };
  } catch (error) {
    throw new Error("Error getting products");
  }
};
