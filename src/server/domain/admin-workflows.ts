import type { PublicationStatus } from "@/types/events";

export type AppRole = "host" | "admin";
export type ReviewAction = "approved" | "revision_requested" | "unlisted" | "cancelled";

const statusByReviewAction: Record<ReviewAction, PublicationStatus> = {
  approved: "published",
  revision_requested: "revision_required",
  unlisted: "unlisted",
  cancelled: "unlisted",
};

export function reviewEvent(input: {
  isAdmin: boolean;
  eventId: string;
  action: ReviewAction;
  actorUserId: string;
  note?: string;
  now?: Date;
}) {
  if (!input.isAdmin) {
    throw new Error("只有管理員可以審核活動。");
  }

  const now = input.now ?? new Date();

  return {
    eventId: input.eventId,
    publicationStatus: statusByReviewAction[input.action],
    reviewAction: input.action,
    actedBy: input.actorUserId,
    note: input.note,
    publishedAt: input.action === "approved" ? now.toISOString() : undefined,
    actedAt: now.toISOString(),
  };
}

export function activateRoleGrantForProfile(input: {
  grantEmailNormalized: string;
  profileEmail: string;
  role: AppRole;
  profileUserId: string;
  now?: Date;
}) {
  if (input.grantEmailNormalized !== input.profileEmail.trim().toLowerCase()) {
    throw new Error("Email 與授權不相符。");
  }

  const now = input.now ?? new Date();

  return {
    userRole: {
      userId: input.profileUserId,
      role: input.role,
    },
    grantStatus: "activated" as const,
    activatedAt: now.toISOString(),
  };
}

export function writeAuditLog(input: {
  actorUserId: string;
  action: string;
  entityType: string;
  entityId?: string;
  metadata?: Record<string, unknown>;
  now?: Date;
}) {
  return {
    actorUserId: input.actorUserId,
    action: input.action,
    entityType: input.entityType,
    entityId: input.entityId,
    metadata: input.metadata ?? {},
    createdAt: (input.now ?? new Date()).toISOString(),
  };
}
