import { type NextRequest, NextResponse } from "next/server"
import { sendNotification } from "@/lib/push-service"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, message, userId, role, type } = body

    if (!title || !message || !type) {
      return NextResponse.json({ error: "Title, message, and type are required" }, { status: 400 })
    }

    await sendNotification({
      title,
      message,
      userId,
      role,
      type,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error sending notification:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
