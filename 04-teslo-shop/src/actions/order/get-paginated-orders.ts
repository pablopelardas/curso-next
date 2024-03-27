'use server'

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

interface PaginationOptions{
    page?: number;
    take?: number;
}

export const getPaginatedOrders = async ({page = 1 ,take = 10}:PaginationOptions) => {
    const session = await auth();
    if (!session?.user || session?.user.role !== "ADMIN"){
        return {
            ok: false,
            message: "You must be authenticated as an admin to get orders",
        };
    }
    try {
        const orders = await prisma.order.findMany({
            orderBy:{
                createdAt: "desc"
            },
            select:{
                id: true,
                userId: true,
                paidAt: true,
                OrderAddress: {
                    select: {
                        firstName: true,
                        lastName: true,
                    }
                },
            },
            take,
            skip: (page - 1) * take,
        })
        if (orders.length === 0){
            return {
                ok: false,
                message: "No orders found"
            }
        }
        console.log(orders)
        return {
            ok: true,
            orders: orders.map(order => ({
                id: order.id,
                fullName: `${order.OrderAddress?.firstName} ${order.OrderAddress?.lastName}`,
                isPaid: !!order.paidAt
            }))
        }
    } catch (error: any) {
        return {
            ok: false,
            message: error.message
        }
    }

}