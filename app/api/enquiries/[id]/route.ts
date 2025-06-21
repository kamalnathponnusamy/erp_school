import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: "Enquiry ID is required" }, { status: 400 });
  }

  try {
    const [rows] = await db.execute("SELECT * FROM enquiries WHERE id = ?", [id]);
    const enquiries = rows as any[];

    if (enquiries.length === 0) {
      return NextResponse.json({ error: "Enquiry not found" }, { status: 404 });
    }

    return NextResponse.json(enquiries[0]);
  } catch (error) {
    console.error(`Error fetching enquiry ${id}:`, error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
