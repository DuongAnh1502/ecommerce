import { Response, Request } from "express";
import { AddressSchema } from "../schema/users";
import { User } from "@prisma/client";
import { prismaClient } from "..";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCodes } from "../exceptions/root";

export const addAddress = async (req: Request, res: Response) => {
    AddressSchema.parse(req.body);
    let user: User;
    const address = await prismaClient.address.create({
        data: {
            ...req.body,
            userId: req.user.id,
        },
    });
    res.json(address);
};

export const deleteAddress = async (req: Request, res: Response) => {
    try {
        const address = await prismaClient.address.delete({
            where: {
                id: +req.params.id,
            },
        });
    } catch (err: any) {
        throw new NotFoundException(
            "Address not found!",
            ErrorCodes.ADDRESS_NOT_FOUND,
            err
        );
    }
    res.json({ message: "Address deleted successfully!" });
};

export const updateAddress = async (req: Request, res: Response) => {};

export const listAddress = async (req: Request, res: Response) => {
    const address = await prismaClient.address.findMany({
        where: {
            userId: +req.user.id,
        },
    });
    res.json(address);
};
