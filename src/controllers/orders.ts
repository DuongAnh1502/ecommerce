import { Request, Response } from "express";
import { prismaClient } from "..";
import { ErrorCodes } from "../exceptions/root";
import { NotFoundException } from "../exceptions/not-found";
import { Order } from "@prisma/client";
import { UnauthorizedException } from "../exceptions/unauthorized";

export const createOrder = async (req: Request, res: Response) => {
    // 1. to create a transaction
    // 2. to list all the cart items and proceed if cart is not empty
    // 3. calculate the total amount of the order
    // 4. fetch the user's address
    // 5. to define computed field for formatted address on address module
    // 6. we will create a order and order product
    // 7. create event
    // 8. to empty the cart
    return await prismaClient.$transaction(async (tx) => {
        const cartItems = await tx.cartItem.findMany({
            where: {
                userId: req.user.id,
            },
            include: {
                product: true,
            },
        });
        if (cartItems.length === 0) {
            return res.json({ message: "Cart is empty" });
        }
        const price = cartItems.reduce((acc, cartItem) => {
            return acc + +cartItem.product.price * cartItem.quantity;
        }, 0);
        const address = await tx.address.findFirst({
            where: {
                id: req.user.defaultShippingAddress!,
            },
        });
        const order = await tx.order.create({
            data: {
                userId: req.user.id,
                netAmount: price,
                address: address?.formattedAddress!,
                products: {
                    create: cartItems.map((cartItem) => {
                        return {
                            productId: cartItem.productId,
                            quantity: cartItem.quantity,
                        };
                    }),
                },
            },
        });
        await tx.orderEvent.create({
            data: {
                orderId: order.id,
            },
        });
        await tx.cartItem.deleteMany({
            where: {
                userId: req.user.id,
            },
        });
        return res.json(order);
    });
};

export const listOrders = async (req: Request, res: Response) => {
    const orders = await prismaClient.order.findMany({
        where: {
            userId: req.user.id,
        },
        include: {
            products: true,
        },
    });
    if (orders) {
        res.json(orders);
    } else {
        res.json({ message: "Your order is empty" });
    }
};

export const cancelOrder = async (req: Request, res: Response) => {
    return await prismaClient.$transaction(async (tx) => {
        try {
            let orderUser = await tx.order.findFirstOrThrow({
                where: {
                    id: +req.params.id,
                    userId: req.user.id,
                },
            });
            const updatedOrder = await tx.order.update({
                where: {
                    id: +req.params.id,
                    userId: orderUser.id,
                },
                data: {
                    status: "CANCELLED",
                },
            });
            await tx.orderEvent.create({
                data: {
                    orderId: updatedOrder.id,
                    status: "CANCELLED",
                },
            });
        } catch (err: any) {
            throw new NotFoundException(
                "Order is not found!",
                ErrorCodes.ORDER_NOT_FOUND,
                err
            );
        }
        res.json({ message: "Cancel successfully!!" });
    });
};

export const getOrderById = async (req: Request, res: Response) => {
    let order: Order;
    try {
        order = await prismaClient.order.findFirstOrThrow({
            where: {
                id: +req.params.id,
            },
            include: {
                products: true,
                events: true,
            },
        });
    } catch (err: any) {
        throw new NotFoundException(
            "Order is not found!",
            ErrorCodes.ORDER_NOT_FOUND,
            err
        );
    }
    res.json(order);
};
