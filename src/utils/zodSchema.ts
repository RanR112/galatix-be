import z from "zod";

export const allowedFileTypes = ['image/png', 'image/jpg', 'image/jpeg']

export const genreSchema = z.object({
    name: z.string().min(1)
}).strict();

export const theaterSchema = z.object({
    name: z.string().min(1),
    city: z.string().min(1)
}).strict();

export const movieSchema = z.object({
    title: z.string().min(1),
    genre: z.string().min(1),
    theaters: z.array(z.string().min(1)).min(1),
    available: z.boolean(),
    description: z.string().min(1).optional(),
    price: z.number(),
    bonus: z.string().optional()
}).strict();

export const authSchema = z.object({
    name: z.string().min(4),
    email: z.string().email(),
    password: z.string().min(8),
    role: z.enum(["admin", "customer"])
})