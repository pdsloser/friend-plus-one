"use server";

import { createSupabaseServiceClient } from "@/lib/supabase/service";
import { expireAcceptedApplications, expireInvitations } from "@/server/domain/expirations";

export async function processExpirations() { if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) { const supabase = createSupabaseServiceClient(); const { data, error } = await supabase.rpc("process_expirations"); if (error) throw new Error(error.message); return data; } const now = new Date(); return { invitations: expireInvitations({ now, invitations: [] }), applications: expireAcceptedApplications({ now, applications: [] }) }; }
