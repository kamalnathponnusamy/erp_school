"use client"

export function Overview() {
  const data = [
    { name: "Mon", total: 95 },
    { name: "Tue", total: 92 },
    { name: "Wed", total: 88 },
    { name: "Thu", total: 94 },
    { name: "Fri", total: 90 },
    { name: "Sat", total: 85 },
  ]

  const maxValue = Math.max(...data.map((d) => d.total))

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Weekly Attendance</h3>
        <span className="text-sm text-muted-foreground">Percentage</span>
      </div>
      <div className="space-y-3">
        {data.map((item) => (
          <div key={item.name} className="flex items-center space-x-4">
            <div className="w-12 text-sm font-medium">{item.name}</div>
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(item.total / maxValue) * 100}%` }}
                  />
                </div>
                <span className="text-sm font-medium w-10">{item.total}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
