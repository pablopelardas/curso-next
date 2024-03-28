'use server'
import prisma from '@/lib/prisma';
import { Gender, Product, Size } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import {z} from 'zod';
import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config(process.env.CLOUDINARY_URL ?? '');

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
    try {
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
            // Proceso de carga y guardado de imagenes
            // Recorrer las imagenes y guardarlas
            if (formData.getAll('images').length > 0){
                // [https://url.jpg]
               const images =  await uploadImages(formData.getAll('images') as File[])
               if (!images) {
                   throw new Error('Error uploading images')
               }
                // Crear o actualizar las imagenes
                await tx.productImage.createMany({
                    data: images.map(image => ({
                        url: image!,
                        productId: product.id
                    }))
                })
            }

    
            return {
                product
            }
        })
    
        revalidatePath(`/admin/products`)
        revalidatePath(`/admin/product/${prismaTx.product.slug}`)
        revalidatePath(`/products/${prismaTx.product.slug}`)

        return {
            ok: true,
            product: prismaTx.product
        }
    } catch (error: any) {
        return{
            ok: false,
            message: error.message
        }
    }

}


const uploadImages = async (files: File[]) => {

    try {
        const images = await Promise.all(files.map(async (file) => {
            const buffer = await file.arrayBuffer();
            const base64 = Buffer.from(buffer).toString('base64');
            const file64 = `data:${file.type};base64,${base64}`;
            try {
                const {secure_url} = await cloudinary.uploader.upload(file64, {
                    folder: 'products',
                    resource_type: 'image',
                    overwrite: true,
                    transformation: [
                        {width: 800, height: 800, crop: 'limit'}
                    ]
                })
                return secure_url
            } catch (error: any) {
                console.log()
                return null
            }

        }))
        return images;
    } catch (error: any) {
        console.log({error})
        return null
    }
}