import { NextResponse } from "next/server";
import { initialGuests } from "@/lib/mock-data";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const guest = initialGuests.find(g => g.id === body.guestId || g.qrCode === body.qrCode) || initialGuests[0];

    return NextResponse.json({
      success: true,
      guest: {
        ...guest,
        checkedIn: true,
        checkedInAt: new Date().toLocaleTimeString()
      },
      table: guest.tableNumber || "A12",
      meal: guest.foodPreference || "Vegetarian",
      parking: guest.parkingSlot || "P3",
      message: `Checked in ${guest.name} at gate.`
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}
