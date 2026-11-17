import { NextResponse } from "next/server";
import { initialWedding } from "@/lib/mock-data";

export async function GET() {
  return NextResponse.json({ success: true, weddings: [initialWedding] });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newWedding = {
      ...initialWedding,
      id: `wed-${Date.now()}`,
      slug: (body.coupleNames || "new-wedding").toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      ...body
    };
    return NextResponse.json({ success: true, wedding: newWedding });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}
