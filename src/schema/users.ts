import { z } from "zod";

export const SignUpSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters long!" }),
});

export const AddressSchema = z.object({
    lineOne: z.string(),
    lineTwo: z.string().nullable(),
    pinCode: z.string().length(6),
    country: z.string(),
    city: z.string(),
});

export const UpdateAddressSchema = z.object({
    lineOne: z.string().optional(),
    lineTwo: z.string().nullable().optional(),
    pinCode: z.string().length(6).optional(),
    country: z.string().optional(),
    city: z.string().optional(),
});

export const UpdateUserSchema = z.object({
    name: z.string().optional(),
    defaultShippingAddress: z.number().optional(),
    defaultBillingAddress: z.number().optional(),
});
