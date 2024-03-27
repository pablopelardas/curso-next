'use server';

import { auth } from "@/auth.config";
import type { Address, Size } from "@/interfaces";
import prisma from "@/lib/prisma";

interface ProductToOrder{
    id: string;
    quantity: number;
    size: Size
}

export const placeOrder = async (productsIds: ProductToOrder[], address: Address) => {
    const session = await auth();
    const userId = session?.user.id;
    if (!userId) {
        return{
            ok: false,
            message: "Session not found"
        }
    }

    // get products
    const products = await prisma.product.findMany({
        where: {
            id: {
                in: productsIds.map((product) => product.id)
            }
        }
    })
    // Calculate total items in order
    const itemsInOrder = productsIds.reduce((count, p) => count + p.quantity, 0);

    // tax, subtotal, total
    const {tax, subtotal, total} = productsIds.reduce((totals, item) => {
        const product = products.find((p) => p.id === item.id);
        if (!product) {
            throw new Error(`Product with id ${item.id} not found - 500`);
        }
        const itemSubtotal = product.price * item.quantity;
        return {
            tax: totals.tax + itemSubtotal * 0.15,
            subtotal: totals.subtotal + itemSubtotal,
            total: totals.total + itemSubtotal * 1.15
        }
    },{
        tax: 0,
        subtotal: 0,
        total: 0
    })

    // Crate db transaction
    try {
        const prismaTx = await prisma.$transaction(async (tx) => {
            // 1. Update stock of products
            const updatedProductsPromises = products.map(async (product) => {
                const productQuantity = productsIds.filter((p) => p.id === product.id).reduce((count, p) => count + p.quantity, 0);
                if (productQuantity == 0) throw new Error(`Product with id ${product.id} has no quantity - 500`);
            
                return tx.product.update({
                    where: {
                        id: product.id
                    },
                    data: {
                        // inStock: product.inStock - productQuantity
                        inStock:{
                            decrement: productQuantity
                        }
                    }
                })
            })
            const updatedProducts = await Promise.all(updatedProductsPromises);
            updatedProducts.forEach((product) => {
                if (product.inStock < 0) throw new Error(`${product.title} no tiene inventario suficiente`);
            });
            // 2. Create order and order items
            const order = await tx.order.create({
                data: {
                    userId,
                    itemsInOrder,
                    subTotal: subtotal,
                    total,
                    tax,
                    OrderItem:{
                        createMany:{
                            data: productsIds.map((product) => ({
                                productId: product.id,
                                quantity: product.quantity,
                                size: product.size,
                                price: products.find((p) => p.id === product.id)!.price
                            }))
                        }
                    }
                }
            });
            console.log({order, updatedProducts})
            // 3. Create order address
            const {country, ...addressWithoutCountry} = address;
            console.log({country, addressWithoutCountry})
            const orderAddress = await tx.orderAddress.create({
                data: {
                    ...addressWithoutCountry,
                    countryId: country,
                    orderId: order.id
                }
            });
    
            return {
                order: order,
                updatedProducts: updatedProducts,
                orderAddress: orderAddress
            }
        });
        return {
            ok: true,
            message: "Order created",
            order: prismaTx.order
        }
    } catch (error: any) {
        console.log(error)
        return {
            ok: false,
            message: error.message
        }
    }
    
    
}