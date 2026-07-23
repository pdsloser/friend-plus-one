import { NextRequest, NextResponse } from "next/server";
import { processExpirations } from "@/server/actions/cron";

export async function POST(request: NextRequest) { const expectedSecret = process.env.CRON_SECRET; if (expectedSecret && request.headers.get("x-cron-secret") !== expectedSecret) return NextResponse.json({ error: "unauthorized" }, { status: 401 }); const result = await processExpirations(); return NextResponse.json(result); }
