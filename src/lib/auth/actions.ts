"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

import { createSupabaseServerClient } from "@/lib/supabase/server";

const loginSchema = z.object({ email: z.string().trim().email(), redirectTo: z.string().optional() });
export async function requestMagicLink(formData: FormData) { const result = loginSchema.safeParse({ email: formData.get("email"), redirectTo: formData.get("redirectTo") }); if (!result.success) redirect("/login?status=invalid_email"); const supabase = await createSupabaseServerClient(); const origin = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"; const nextPath = result.data.redirectTo || "/"; const { error } = await supabase.auth.signInWithOtp({ email: result.data.email, options: { emailRedirectTo: `${origin}/auth/callback?next=${encodeURIComponent(nextPath)}` } }); if (error) redirect("/login?status=send_failed"); redirect("/login?status=sent"); }
