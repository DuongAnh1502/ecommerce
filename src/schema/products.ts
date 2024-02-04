import { z } from "zod";

export const ProductSchema = z.object({
    name: z.string(),
    description: z.string(),
    price: z.number().min(1, { message: "Price must be greater than 0" }),
    tags: z.array(z.string()),
});
