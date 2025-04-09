import {z } from 'zod';
export const registerSchema = z.object({
    name:z.string(),
    email:z.string().email(),
    password:z.string()
});

export const loginSchema = z.object({
    email:z.string().email(),
    password:z.string()
    });
export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;