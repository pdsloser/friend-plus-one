"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { reviewEvent } from "@/server/domain/admin-workflows";

export async function approveEventAction(formData: FormData) {
  reviewEvent({
    isAdmin: formData.get("isAdmin") === "true",
    eventId: String(formData.get("eventId") ?? ""),
    action: "approved",
    actorUserId: String(formData.get("actorUserId") ?? ""),
  });
  const supabase = await createSupabaseServerClient();
  await supabase.rpc("admin_review_event", {
    event_uuid: String(formData.get("eventId") ?? ""),
    review: "approved",
    review_note: null,
  });

  revalidatePath("/admin/events");
  redirect("/admin/events?status=approved");
}

export async function requestRevisionAction(formData: FormData) {
  reviewEvent({
    isAdmin: formData.get("isAdmin") === "true",
    eventId: String(formData.get("eventId") ?? ""),
    action: "revision_requested",
    actorUserId: String(formData.get("actorUserId") ?? ""),
    note: String(formData.get("note") ?? ""),
  });
  const supabase = await createSupabaseServerClient();
  await supabase.rpc("admin_review_event", {
    event_uuid: String(formData.get("eventId") ?? ""),
    review: "revision_requested",
    review_note: String(formData.get("note") ?? ""),
  });

  revalidatePath("/admin/events");
  redirect("/admin/events?status=revision_requested");
}
