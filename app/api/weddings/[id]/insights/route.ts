import { NextResponse } from "next/server";
import { initialWedding } from "@/lib/mock-data";

export async function GET() {
  return NextResponse.json({
    success: true,
    aiAttendanceEstimate: initialWedding.aiAttendanceEstimate,
    cateringEstimate: initialWedding.cateringEstimate,
    factors: initialWedding.aiAttendanceEstimate.factors
  });
}
