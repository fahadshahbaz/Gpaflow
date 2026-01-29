import { z } from "zod";
import MailChecker from "mailchecker";

export const authSchema = z.object({
    email: z
        .string()
        .min(1, "Email is required")
        .email("Please enter a valid email address")
        .refine((email) => MailChecker.isValid(email), {
            message: "Disposable emails are not allowed",
        }),
    password: z
        .string()
        .min(1, "Password is required")
        .min(6, "Password must be at least 6 characters"),
});

export type AuthFormData = z.infer<typeof authSchema>;
