'use server'

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export const getCategories = async () => {
    const session = await auth();
    if (!session?.user || session?.user.role !== "ADMIN"){
        return {
            ok: false,
            message: "You must be authenticated as an admin to get categories",
        };
    }
    try {
        const categories = await prisma.category.findMany({
            orderBy:{
                name: "asc"
            },
            select:{
                id: true,
                name: true,
            }
        })
        if (categories.length === 0){
            return {
                ok: false,
                message: "No categories found",
            }
        }
        return {
            ok: true,
            categories
        }
    } catch (error: any) {
        return {
            ok: false,
            message: error.message,
        }
    }
}