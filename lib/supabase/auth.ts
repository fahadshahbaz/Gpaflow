"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { authSchema } from "@/lib/validations/auth";

export type AuthState = {
    error?: string;
    success?: string;
    fieldErrors?: {
        email?: string[];
        password?: string[];
    };
};

export async function signUp(_prevState: AuthState, formData: FormData): Promise<AuthState> {
    const rawData = {
        email: formData.get("email"),
        password: formData.get("password"),
    };

    const result = authSchema.safeParse(rawData);

    if (!result.success) {
        return { fieldErrors: result.error.flatten().fieldErrors };
    }

    const supabase = await createClient();
    const { data, error } = await supabase.auth.signUp({
        email: result.data.email,
        password: result.data.password,
    });

    if (error) {
        return { error: error.message };
    }

    // If email confirmation is required, user won't have a session
    if (data.user && !data.session) {
        return { success: "Check your email for the confirmation link" };
    }

    redirect("/dashboard");
}

export async function signIn(_prevState: AuthState, formData: FormData): Promise<AuthState> {
    const rawData = {
        email: formData.get("email"),
        password: formData.get("password"),
    };

    const result = authSchema.safeParse(rawData);

    if (!result.success) {
        return { fieldErrors: result.error.flatten().fieldErrors };
    }

    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithPassword({
        email: result.data.email,
        password: result.data.password,
    });

    if (error) {
        return { error: error.message };
    }

    redirect("/dashboard");
}

export async function signOut() {
    const supabase = await createClient();
    await supabase.auth.signOut();
    redirect("/login");
}

export async function getUser() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    return user;
}

export async function forgotPassword(_prevState: AuthState, formData: FormData): Promise<AuthState> {
    const email = formData.get("email") as string;

    if (!email) {
        return { error: "Email is required" };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return { error: "Please enter a valid email address" };
    }

    const supabase = await createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/api/auth/callback?type=recovery`,
    });

    if (error) {
        return { error: error.message };
    }

    return { success: "Check your email for the password reset link" };
}

export async function resetPassword(_prevState: AuthState, formData: FormData): Promise<AuthState> {
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (!password || password.length < 6) {
        return { error: "Password must be at least 6 characters" };
    }

    if (password !== confirmPassword) {
        return { error: "Passwords do not match" };
    }

    const supabase = await createClient();
    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
        return { error: error.message };
    }

    redirect("/login");
}
