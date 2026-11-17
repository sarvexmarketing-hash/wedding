import { NextResponse } from "next/server";
import { initialEvents } from "@/lib/mock-data";

export async function GET() {
  return NextResponse.json({ success: true, events: initialEvents });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newEvent = {
      id: `evt-${Date.now()}`,
      weddingId: "wed-rahul-priya",
      ...body
    };
    return NextResponse.json({ success: true, event: newEvent });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}
