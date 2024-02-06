import { z } from "zod";

export const CartSchema = z.object({
    productId: z.number(),
    quantity: z.number(),
});

export const UpdateCartSchema = z.object({
    quantity: z.number(),
});
