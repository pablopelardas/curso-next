'use server'

import { auth } from "@/auth.config";
import { User } from "@/interfaces";
import prisma from "@/lib/prisma";

interface PaginationOptions{
    page?: number;
    take?: number;
}

export const getPaginatedUsers = async ({page = 1 ,take = 10}:PaginationOptions) => {
    const session = await auth();
    if (!session?.user || session?.user.role !== "ADMIN"){
        return {
            ok: false,
            message: "You must be authenticated as an admin to get orders",
        };
    }
    try {
        const totalPages = Math.ceil(await prisma.user.count() / take);
        const users = await prisma.user.findMany({
            orderBy:{
                name: "asc"
            },
            select:{
                id: true,
                email: true,
                name: true,
                role: true,
                emailVerified: true,
                image: true
            },
            take,
            skip: (page - 1) * take,
        })
        if (users.length === 0){
            return {
                ok: false,
                message: "No users found",
            }
        }
        return {
            ok: true,
            users: users.map(user => ({
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
                emailVerified: user.emailVerified,
                image: user.image
            })),
            totalPages
        }
    } catch (error: any) {
        return {
            ok: false,
            message: error.message,
        }
    }

}