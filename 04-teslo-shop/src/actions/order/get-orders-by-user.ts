'use server'

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export const getOrdersByUser = async () => {
    const session = await auth();
    if (!session?.user){
        return {
            ok: false,
            message: "You must be authenticated to get orders",
        };
    }
    try {
        const orders = await prisma.order.findMany({
            where: {
                userId: session.user.id
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
            }
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