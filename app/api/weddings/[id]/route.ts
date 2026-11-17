import { NextResponse } from "next/server";
import { initialWedding, initialEvents, initialGuests, initialFamilies } from "@/lib/mock-data";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const resolved = await params;
  return NextResponse.json({
    success: true,
    wedding: initialWedding,
    events: initialEvents,
    guestCount: initialGuests.length,
    familyCount: initialFamilies.length
  });
}
