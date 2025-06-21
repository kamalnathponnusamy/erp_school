import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const activities = [
  {
    id: 1,
    user: "John Doe",
    action: "marked attendance",
    time: "2 minutes ago",
    initials: "JD",
  },
  {
    id: 2,
    user: "Jane Smith",
    action: "uploaded marks",
    time: "5 minutes ago",
    initials: "JS",
  },
  {
    id: 3,
    user: "Mike Johnson",
    action: "created announcement",
    time: "10 minutes ago",
    initials: "MJ",
  },
  {
    id: 4,
    user: "Sarah Wilson",
    action: "updated timetable",
    time: "15 minutes ago",
    initials: "SW",
  },
]

export function RecentActivity() {
  return (
    <div className="space-y-8">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarFallback>{activity.initials}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{activity.user}</p>
            <p className="text-sm text-muted-foreground">
              {activity.action} • {activity.time}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
