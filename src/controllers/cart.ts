import { Request, Response } from "express";
import { CartSchema, UpdateCartSchema } from "../schema/cart";
import { prismaClient } from "..";
import { UnauthorizedException } from "../exceptions/unauthorized";
import { ErrorCodes } from "../exceptions/root";
import { CartItem, Product } from "@prisma/client";

export const addToCart = async (req: Request, res: Response) => {
    const validatedData = CartSchema.parse(req.body);
    let product: Product;
    try {
        product = await prismaClient.product.findFirstOrThrow({
            where: {
                id: validatedData.productId,
            },
        });
    } catch (err: any) {
        throw new UnauthorizedException(
            "Product not found",
            ErrorCodes.PRODUCT_NOT_FOUND,
            err
        );
    }
    try {
    } catch (err: any) {
        throw new UnauthorizedException(
            "Product not found",
            ErrorCodes.PRODUCT_NOT_FOUND,
            err
        );
    }
    const oldCart = await prismaClient.cartItem.findFirst({
        where: {
            productId: validatedData.productId,
            userId: req.user.id,
        },
    });
    if (!oldCart) {
        const cart = await prismaClient.cartItem.create({
            data: {
                ...validatedData,
                userId: req.user.id,
            },
        });
        res.send(cart);
    } else {
        const cart = await prismaClient.cartItem.update({
            where: {
                id: oldCart.id,
            },
            data: {
                quantity: oldCart.quantity + validatedData.quantity,
            },
        });
        res.send(cart);
    }
};

export const removeFromCart = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    let cart: CartItem;
    try {
        cart = await prismaClient.cartItem.findFirstOrThrow({
            where: {
                productId: id,
                userId: req.user.id,
            },
        });
    } catch (err: any) {
        throw new UnauthorizedException(
            "Product not found in cart",
            ErrorCodes.PRODUCT_NOT_FOUND,
            err
        );
    }
    await prismaClient.cartItem.delete({
        where: {
            id: cart.id,
        },
    });
    res.send({ message: "Product removed from cart" });
};

export const changeQuantity = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const validatedData = UpdateCartSchema.parse(req.body);
    let cart: CartItem;
    try {
        cart = await prismaClient.cartItem.findFirstOrThrow({
            where: {
                productId: id,
                userId: req.user.id,
            },
        });
    } catch (err: any) {
        throw new UnauthorizedException(
            "Product not found in cart",
            ErrorCodes.PRODUCT_NOT_FOUND,
            err
        );
    }
    cart = await prismaClient.cartItem.update({
        where: {
            id: cart.id,
        },
        data: {
            quantity: validatedData.quantity,
        },
    });
    res.send({ message: "Cart updated", cart });
};

export const getCart = async (req: Request, res: Response) => {
    const cart = await prismaClient.cartItem.findMany({
        where: {
            userId: req.user.id,
        },
    });
    res.json(cart);
};
