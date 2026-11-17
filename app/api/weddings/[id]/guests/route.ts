import { NextResponse } from "next/server";
import { initialGuests } from "@/lib/mock-data";

export async function GET() {
  return NextResponse.json({ success: true, count: initialGuests.length, guests: initialGuests });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newGuest = {
      id: `gst-${Date.now()}`,
      weddingId: "wed-rahul-priya",
      ...body,
      inviteToken: `tkn-${Math.random().toString(36).substring(2, 9)}`,
      qrCode: `WOS-RP-${Math.floor(Math.random() * 900) + 100}`,
      checkedIn: false
    };
    return NextResponse.json({ success: true, guest: newGuest });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}
