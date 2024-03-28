'use server'
import prisma from '@/lib/prisma';
import { Gender, Product, Size } from '@prisma/client';
import {z} from 'zod';

const productSchema = z.object({
    id: z.string().uuid().optional().nullable(),
    title: z.string().min(3).max(255),
    slug: z.string().min(3).max(255),
    description: z.string(),
    price: z.coerce.number().positive().transform(value => Number(value.toFixed(2))),
    inStock: z.coerce.number().int().positive().transform(value => Number(value.toFixed(0))),
    categoryId: z.string().uuid(),
    sizes: z.coerce.string().transform(value => value.split(",")),
    tags: z.string(),
    gender: z.nativeEnum(Gender)
})

export const createUpdateProduct = async (formData: FormData) => {
    const data = Object.fromEntries(formData);
    const productParsed = productSchema.safeParse(data);

    if (!productParsed.success) {
        console.log({error: productParsed.error.errors})
        return {
            ok: false,
            message: productParsed.error.errors
        }
    }

    const product = productParsed.data;
    product.slug = product.slug.toLowerCase().replace(/ /g, "-").trim();
    const {id, ...rest} = product
    const prismaTx = await prisma.$transaction(async (tx) => {
        let product : Product;
        const tagsArray = rest.tags.split(",").map(tag => tag.trim());
        const sizesArray = rest.sizes as Size[];
        if (id) {
            product = await tx.product.update({
                where: {
                    id
                },
                data: {
                    ...rest,
                    sizes:{
                        set: sizesArray
                    },
                    tags:{
                        set: tagsArray
                    }
                }
            })
        } else{
            product = await tx.product.create({
                data: {
                    ...rest,
                    sizes:{
                        set: sizesArray
                    },
                    tags:{
                        set: tagsArray
                    }
                }
            })
        }

        console.log({updatedProduct: product})

        return {
            ok: true,
            product
        }
    })

    return prismaTx;
}