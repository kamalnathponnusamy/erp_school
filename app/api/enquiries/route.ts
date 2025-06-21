import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { format } from 'date-fns';

// Fetch all enquiries
export async function GET() {
  try {
    const [rows] = await db.execute("SELECT * FROM enquiries ORDER BY enquiry_date DESC");
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error fetching enquiries:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// Add a new enquiry
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      student_name, 
      class_applying_for,
      contact_person, 
      contact_phone, 
      contact_email, 
      purpose_of_enquiry,
      enquiry_date, 
      status,
      notes 
    } = body;

    // Validate required fields
    if (!student_name || !class_applying_for || !contact_person || !contact_phone || 
        !contact_email || !purpose_of_enquiry || !enquiry_date || !status) {
      return NextResponse.json({ 
        error: "All mandatory fields are required" 
      }, { status: 400 });
    }

    // Validate phone number format
    if (!/^[6-9]\d{9}$/.test(contact_phone)) {
      return NextResponse.json({ 
        error: "Phone number should start with 6, 7, 8, or 9 and be 10 digits" 
      }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contact_email)) {
      return NextResponse.json({ 
        error: "Please enter a valid email address" 
      }, { status: 400 });
    }

    const formattedEnquiryDate = format(new Date(enquiry_date), 'yyyy-MM-dd');

    const [result] = await db.execute(
      `INSERT INTO enquiries (
        student_name, class_applying_for, contact_person, contact_phone, 
        contact_email, purpose_of_enquiry, enquiry_date, status, notes
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        student_name, class_applying_for, contact_person, contact_phone, 
        contact_email, purpose_of_enquiry, formattedEnquiryDate, status, notes || null
      ]
    );

    return NextResponse.json({ success: true, id: (result as any).insertId }, { status: 201 });
  } catch (error) {
    console.error("Error adding enquiry:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
} 