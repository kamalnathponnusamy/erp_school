import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const [rows] = await db.execute("SELECT * FROM users LIMIT 1");
    const users = rows as any[];
    return NextResponse.json({ success: true, user: users[0] || null });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ success: false, error: message });
  }
} 