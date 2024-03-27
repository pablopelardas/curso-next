'use server'

import { PayPalOrderStatusResponse } from "@/interfaces";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";


export async function paypalCheckPayment(transactionId: string) {

    try {
        const authToken = await getPayPalBearerToken();     
        if (!authToken) {
            console.log("Error getting auth token");
            return{
                ok: false,
                message: "Error getting auth token"
            }
        }
        const paymentInfo = await verifyPayPalPayment(transactionId, authToken);
        if (!paymentInfo) {
            console.log("Payment not completed");
            return {
                ok: false,
                message: "Payment not completed"
            };
        }

        const {status, purchase_units } = paymentInfo;
        if (status !== "COMPLETED") {
            console.log("Payment not completed");
            return {
                ok: false,
                message: "Payment not completed"
            };
        }

        const {invoice_id} = purchase_units[0];
        // update order status in database
        const order = await prisma.order.findFirst({
            where: {
                id: invoice_id
            }
        });
        if (!order) {
            console.log("Order not found");
            return {
                ok: false,
                message: "Order not found"
            };
        }

        await prisma.order.update({
            where: {
                id: order.id
            },
            data: {
                paidAt: new Date(),
            }
        });

        revalidatePath(`/orders/${order.id}`)
        
        console.log("Payment completed");
        return {
            ok: true,
            message: "Payment completed"
        };

    } catch (error: any) {
        console.log(error);
        return {
            ok: false,
            message: error.message
        };
    }
}

async function getPayPalBearerToken() {
    const PAYPAL_CLIENT_ID =  process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
    const PAYPAL_SECRET = process.env.PAYPAL_SECRET;
    const PAYPAL_OAUTH_URL = process.env.PAYPAL_OAUTH_URL ?? "";
    const base64Token = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`, 'utf-8').toString('base64');
    const myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Authorization", "Basic " + base64Token);

    const urlencoded = new URLSearchParams();
    urlencoded.append("grant_type", "client_credentials");

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: urlencoded,
    };

    try {
        const result = await fetch(PAYPAL_OAUTH_URL, {
            ...requestOptions,
            cache: "no-store",
        }).then((res) => res.json());
        return result.access_token;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const verifyPayPalPayment = async(transactionId: string, bearerToken: string) : Promise<PayPalOrderStatusResponse|null> => {
    const PAYPAL_ORDERS_URL = process.env.PAYPAL_ORDERS_URL ?? "";
    const requestOptions = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${bearerToken}`,
            "Content-Type": "application/json",
        },
    };

    const result = await fetch(`${PAYPAL_ORDERS_URL}/${transactionId}`, {
        ...requestOptions,
        cache: "no-store",
    }).then((res) => res.json());
    console.log(result);

    if (result.status === "COMPLETED") {
        return result;
    }

    return null;
}
