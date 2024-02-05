import { z } from "zod";

export const ProductSchema = z.object({
    name: z.string(),
    description: z.string(),
    price: z.number().min(1, { message: "Price must be greater than 0" }),
    tags: z.array(z.string()),
});

export const UpdateProductSchema = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    price: z
        .number()
        .min(1, { message: "Price must be greater than 0" })
        .optional(),
    tags: z.array(z.string()).optional(),
});
