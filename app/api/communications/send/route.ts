import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    return NextResponse.json({
      success: true,
      messageId: `msg-${Date.now()}`,
      channel: body.channel || "WhatsApp",
      recipientsCount: body.recipientsCount || 1,
      status: "queued_for_delivery"
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}
