import { Request, Response } from "express";
import { prismaClient } from "..";

export const createProducts = async (req: Request, res: Response) => {
    //Create validator
    const product = await prismaClient.product.create({
        data: {
            ...req.body,
            tags: req.body.tags.join(","),
        },
    });
    res.json(product);
};
