'use server'

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";
import { Role } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const setUserRole = async (userId: string, role: Role) => {
    const session = await auth();
    if (!session?.user || session?.user.role !== "ADMIN") {
        return {
            ok: false,
            message: "You must be authenticated as an admin to set user role",
        };
    }
    try {
        const user = await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                role
            }
        })
        revalidatePath("/admin/users")
        return {
            ok: true,
            user
        }
    } catch (error: any) {
        return {
            ok: false,
            message: error.message
        }
    }
}