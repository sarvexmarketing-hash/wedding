import { NextResponse } from "next/server";
import { initialWedding } from "@/lib/mock-data";

export async function GET() {
  return NextResponse.json({
    success: true,
    totalInvited: initialWedding.totalInvited,
    confirmed: initialWedding.confirmedCount,
    pending: initialWedding.pendingCount,
    declined: initialWedding.declinedCount,
    checkedIn: initialWedding.checkedInCount,
    completionPercentage: initialWedding.rsvpCompletionPercentage,
    expectedAttendance: initialWedding.aiAttendanceEstimate,
    catering: initialWedding.cateringEstimate
  });
}
