import { db } from "./db"

export interface NotificationPayload {
  title: string
  message: string
  userId?: number
  role?: string
  type: string
}

export async function sendNotification(payload: NotificationPayload) {
  try {
    // Store notification in database only for now
    // Web push can be added later when VAPID keys are available
    await db.execute(
      `
      INSERT INTO notifications (title, message, user_id, role, type) 
      VALUES (?, ?, ?, ?, ?)
    `,
      [payload.title, payload.message, payload.userId, payload.role, payload.type],
    )

    console.log("Notification stored:", payload.title)
    return { success: true }
  } catch (error) {
    console.error("Error storing notification:", error)
    throw error
  }
}

// Placeholder for future Expo notifications
export async function sendExpoNotification(payload: NotificationPayload) {
  console.log("Expo notification would be sent:", payload.title)
  return { success: true }
}
