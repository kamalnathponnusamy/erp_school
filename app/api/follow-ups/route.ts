import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { format } from "date-fns";

// Fetch follow-ups for a specific enquiry
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const enquiryId = searchParams.get('enquiry_id');

  if (!enquiryId) {
    return NextResponse.json({ error: "Enquiry ID is required" }, { status: 400 });
  }

  try {
    const [rows] = await db.execute(
      "SELECT * FROM follow_ups WHERE enquiry_id = ? ORDER BY follow_up_date DESC",
      [enquiryId]
    );
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error fetching follow-ups:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// Add a new follow-up
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { enquiry_id, follow_up_date, notes, next_follow_up_date, status } = body;

    if (!enquiry_id || !follow_up_date || !status) {
      return NextResponse.json({ error: "Enquiry ID, follow-up date, and status are required" }, { status: 400 });
    }
    
    const formattedFollowUpDate = format(new Date(follow_up_date), 'yyyy-MM-dd');
    const formattedNextFollowUpDate = next_follow_up_date ? format(new Date(next_follow_up_date), 'yyyy-MM-dd') : null;

    const [result] = await db.execute(
      "INSERT INTO follow_ups (enquiry_id, follow_up_date, notes, next_follow_up_date, status) VALUES (?, ?, ?, ?, ?)",
      [enquiry_id, formattedFollowUpDate, notes, formattedNextFollowUpDate, status]
    );

    return NextResponse.json({ success: true, id: (result as any).insertId }, { status: 201 });
  } catch (error) {
    console.error("Error adding follow-up:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
} 