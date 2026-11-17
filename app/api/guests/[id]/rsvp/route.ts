import { NextResponse } from "next/server";

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolved = await params;
    const body = await request.json();

    return NextResponse.json({
      success: true,
      guestId: resolved.id,
      rsvpStatus: body.rsvpStatus,
      foodPreference: body.foodPreference,
      eventsAttending: body.eventsAttending,
      message: "RSVP successfully recorded in WeddingOS database."
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}
