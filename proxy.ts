import { type NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function proxy(request: NextRequest) {
    let response = NextResponse.next({ request });

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll();
                },
                setAll(cookiesToSet) {
                    for (const { name, value } of cookiesToSet) {
                        request.cookies.set(name, value);
                    }
                    response = NextResponse.next({ request });
                    for (const { name, value, options } of cookiesToSet) {
                        response.cookies.set(name, value, options);
                    }
                },
            },
        },
    );

    const {
        data: { user },
    } = await supabase.auth.getUser();

    // Protected routes - redirect to login if not authenticated
    const protectedPaths = ["/dashboard"];
    const isProtectedPath = protectedPaths.some((path) =>
        request.nextUrl.pathname.startsWith(path),
    );

    if (isProtectedPath && !user) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    // Auth routes - redirect to dashboard if already authenticated
    const authPaths = ["/login", "/signup"];
    const isAuthPath = authPaths.some((path) =>
        request.nextUrl.pathname.startsWith(path),
    );

    if (isAuthPath && user) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return response;
}

export const config = {
    matcher: ["/dashboard/:path*", "/login", "/signup"],
};
