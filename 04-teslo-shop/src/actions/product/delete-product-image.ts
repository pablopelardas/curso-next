'use server'
import prisma from '@/lib/prisma';
import {v2 as cloudinary} from 'cloudinary';
import { revalidatePath } from 'next/cache';
          
cloudinary.config(process.env.CLOUDINARY_URL ?? '');

export const deleteProductImage = async ( imageId: number, imageUrl: string) => {
    console.log("deleteProductImage", imageId, imageUrl)

    if (!imageUrl.startsWith('http')){
        return {
            ok: false,
            message: "Cannot delete images from file system"
        }
    }
    const imageName = imageUrl.split('/').pop()?.split('.')[0];

    console.log(imageName)


    try {
        await cloudinary.uploader.destroy(`products/${imageName}`);
        const deletedImage = await prisma.productImage.delete({
            where:{
                id: imageId
            },
            select:{
                product:{
                    select:{
                        slug: true
                    }
                }
            }
        })

        revalidatePath(`/admin/products`)
        revalidatePath(`/admin/product/${deletedImage.product.slug}`)
        revalidatePath(`/products/${deletedImage.product.slug}`)

        return {
            ok: true,
            deletedImage
        }

    } catch (error: any) {
        return{
            ok: false,
            message: "Error deleting image from cloudinary"
        }
    }
}