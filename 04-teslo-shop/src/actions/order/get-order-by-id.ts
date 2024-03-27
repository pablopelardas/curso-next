'use server'

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";


export const getOrderById = async (orderId: string) => {
    const session = await auth();
    if (!session?.user){
        return {
            ok: false,
            message: "You must be authenticated to get orders",
        };
    }
    try {
        const order = await prisma.order.findUnique({
            where: {
                id: orderId
            },
            select:{
                id: true,
                total: true,
                userId: true,
                subTotal: true,
                tax: true,
                paidAt: true,
                itemsInOrder: true,
                OrderAddress: {
                    select: {
                        firstName: true,
                        lastName: true,
                        address: true,
                        address2: true,
                        city: true,
                        country: true,
                        zip: true,
                        phone: true,
                    }
                
                },
                OrderItem: {
                    select: {
                        price: true,
                        quantity: true,
                        size: true,
                        product:{
                            select: {
                                title: true,
                                id: true,
                                slug: true,
                                ProductImage:{
                                    select: {
                                        url: true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });
        if (!order){
            return {
                ok: false,
                message: "Order not found"
            }
        }
        if (order.userId !== session.user.id && session.user.role !== "ADMIN"){
            return {
                ok: false,
                message: "You are not authorized to get this order"
            }
        }
        return{
            ok: true,
            data: order
        }
    } catch (error) {
        console.log(error)
        return {
            ok: false,
            message: "Error getting order by id",
        };
    }


}