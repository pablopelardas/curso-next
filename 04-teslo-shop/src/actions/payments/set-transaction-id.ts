'use server'

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export const setTransactionId = async (orderID: string, transactionID : string) => {
    const session = await auth();
    const userId = session?.user.id;
    try{
        if (!userId) {
            return{
                ok: false,
                message: "Session not found"
            }
        }
    
        const order = await prisma.order.findFirst({
            where: {
                id: orderID,
                userId: userId
            }
        })
    
        if (!order) {
            return {
                ok: false,
                message: "Order not found"
            }
        }
    
        await prisma.order.update({
            where: {
                id: order.id
            },
            data: {
                transactionId: transactionID
            }
        })
    
        return {
            ok: true,
            message: "Transaction ID set"
        }

    }catch(e: any){
        return {
            ok: false,
            message: e.message
        }
    }

}