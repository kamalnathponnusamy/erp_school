import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const recentActions = [
  {
    id: 1,
    user: "System Admin",
    action: "Updated menu permissions",
    target: "Student Management",
    time: "2 minutes ago",
    type: "permission",
    initials: "SA",
  },
  {
    id: 2,
    user: "John Admin",
    action: "Created new user role",
    target: "Librarian",
    time: "15 minutes ago",
    type: "role",
    initials: "JA",
  },
  {
    id: 3,
    user: "System",
    action: "Database backup completed",
    target: "school_erp_db",
    time: "1 hour ago",
    type: "system",
    initials: "SY",
  },
  {
    id: 4,
    user: "Admin User",
    action: "Modified user permissions",
    target: "teacher@school.com",
    time: "2 hours ago",
    type: "user",
    initials: "AU",
  },
  {
    id: 5,
    user: "System",
    action: "Security scan completed",
    target: "All modules",
    time: "4 hours ago",
    type: "security",
    initials: "SY",
  },
]

export function RecentActions() {
  const getActionTypeColor = (type: string) => {
    switch (type) {
      case "permission":
        return "bg-blue-100 text-blue-800"
      case "role":
        return "bg-green-100 text-green-800"
      case "system":
        return "bg-purple-100 text-purple-800"
      case "user":
        return "bg-orange-100 text-orange-800"
      case "security":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-4">
      {recentActions.map((action) => (
        <div key={action.id} className="flex items-start space-x-3">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="text-xs">{action.initials}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">{action.user}</p>
              <Badge variant="outline" className={getActionTypeColor(action.type)}>
                {action.type}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              {action.action} <span className="font-medium">{action.target}</span>
            </p>
            <p className="text-xs text-muted-foreground">{action.time}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
