import { Request, Response } from "express";
import { prismaClient } from "..";
import { ProductSchema } from "../schema/products";
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
    ProductSchema.parse(req.body);
    const product = await prismaClient.product.update({
        where: {
            id: Number(id),
        },
        data: {
            ...req.body,
            tags: req.body.tags.join(","),
        },
    });
    res.json(product);
};

export const deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    await prismaClient.product.delete({
        where: {
            id: Number(id),
        },
    });
    res.json({ message: "Product deleted" });
};

export const listProducts = async (req: Request, res: Response) => {
    const products = await prismaClient.product.findMany();
    res.json(products);
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
