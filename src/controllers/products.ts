import { Request, Response } from "express";
import { prismaClient } from "..";
import { ProductSchema } from "../schema/products";

export const createProducts = async (req: Request, res: Response) => {
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
