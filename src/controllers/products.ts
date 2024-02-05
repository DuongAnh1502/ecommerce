import { Request, Response } from "express";
import { prismaClient } from "..";
import { ProductSchema, UpdateProductSchema } from "../schema/products";
import { ErrorCodes } from "../exceptions/root";
import { NotFoundException } from "../exceptions/not-found";

export const createProduct = async (req: Request, res: Response) => {
    //Create validator
    ProductSchema.parse(req.body);
    const product = await prismaClient.product.create({
        data: {
            ...req.body,
            tags: req.body.tags.join(","),
        },
    });
    res.json(product);
};

export const updateProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    UpdateProductSchema.parse(req.body);
    if (req.body.tags) {
        req.body.tags = req.body.tags.join(",");
    }
    const product = await prismaClient.product.update({
        where: {
            id: Number(id),
        },
        data: {
            ...req.body,
        },
    });
    res.json(product);
};

export const deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    await prismaClient.product.delete({
        where: {
            id: +id,
        },
    });
    res.json({ message: "Product deleted" });
};

export const listProducts = async (req: Request, res: Response) => {
    const count = await prismaClient.product.count();
    const products = await prismaClient.product.findMany({
        skip: +req.query.skip! || 0,
        take: 5,
    });
    const list = {
        count,
        data: products,
    };
    res.json(list);
};

export const getProductById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const product = await prismaClient.product.findUnique({
            where: {
                id: Number(id),
            },
        });
        res.json(product);
    } catch (err: any) {
        throw new NotFoundException(
            "Product not found",
            ErrorCodes.PRODUCT_NOT_FOUND,
            err
        );
    }
};
