import { Response, Request } from "express";
import {
    AddressSchema,
    ChangeUserRoleSchema,
    UpdateAddressSchema,
    UpdateUserSchema,
} from "../schema/users";
import { prismaClient } from "..";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCodes } from "../exceptions/root";
import { UnauthorizedException } from "../exceptions/unauthorized";
import { Address, User } from "@prisma/client";

export const addAddress = async (req: Request, res: Response) => {
    AddressSchema.parse(req.body);
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

export const updateAddress = async (req: Request, res: Response) => {
    UpdateAddressSchema.parse(req.body);
    try {
        const updateAddress = await prismaClient.address.update({
            where: {
                id: +req.params.id,
                userId: +req.user.id,
            },
            data: {
                ...req.body,
            },
        });
    } catch (err: any) {
        throw new UnauthorizedException(
            "You are not authorized to update this address!",
            ErrorCodes.UNAUTHORIZED,
            err
        );
    }
    res.json(updateAddress);
};

export const listAddress = async (req: Request, res: Response) => {
    const address = await prismaClient.address.findMany({
        where: {
            userId: +req.user.id,
        },
    });
    res.json(address);
};

//User route
export const updateUser = async (req: Request, res: Response) => {
    UpdateUserSchema.parse(req.body);
    let shippingAddress: Address;
    let billingAddress: Address;
    if (req.body.defaultShippingAddress !== null) {
        try {
            shippingAddress = await prismaClient.address.findFirstOrThrow({
                where: {
                    id: req.body.defaultShippingAddress,
                },
            });
        } catch (err: any) {
            throw new NotFoundException(
                "Shipping Address not found!",
                ErrorCodes.ADDRESS_NOT_FOUND,
                err
            );
        }
        if (shippingAddress.userId !== req.user.id) {
            throw new UnauthorizedException(
                "You are not authorized to update this address!",
                ErrorCodes.UNAUTHORIZED
            );
        }
    }
    if (req.body.defaultBillingAddress !== null) {
        try {
            billingAddress = await prismaClient.address.findFirstOrThrow({
                where: {
                    id: req.body.defaultBillingAddress,
                },
            });
        } catch (err: any) {
            throw new NotFoundException(
                "Billing Address not found!",
                ErrorCodes.ADDRESS_NOT_FOUND,
                err
            );
        }
        if (billingAddress.userId !== req.user.id) {
            throw new UnauthorizedException(
                "You are not authorized to update this address!",
                ErrorCodes.UNAUTHORIZED
            );
        }
    }
    const updatedUser = await prismaClient.user.update({
        where: {
            id: req.user.id,
        },
        data: req.body,
    });
    res.json(updatedUser);
};

export const listUsers = async (req: Request, res: Response) => {
    const users = await prismaClient.user.findMany({
        skip: +req.params.skip || 0,
        take: 5,
    });
    if (users) {
        res.json(users);
    } else {
        res.json({ message: "Empty!" });
    }
};

export const getUserById = async (req: Request, res: Response) => {
    try {
        const user = await prismaClient.user.findFirstOrThrow({
            where: {
                id: +req.params.id,
            },
        });
        res.json(user);
    } catch (err: any) {
        throw new NotFoundException(
            "User not found!!",
            ErrorCodes.USER_NOT_FOUND,
            err
        );
    }
};

export const changeUserRole = async (req: Request, res: Response) => {
    const validatedData = ChangeUserRoleSchema.parse(req.body);
    try {
        const user = await prismaClient.user.update({
            where: {
                id: +validatedData.id,
            },
            data: {
                roleName: validatedData.role,
            },
            include: {
                addresses: true,
            },
        });
        res.json(user);
    } catch (err: any) {
        throw new NotFoundException(
            "User not found!",
            ErrorCodes.USER_NOT_FOUND,
            err
        );
    }
};
