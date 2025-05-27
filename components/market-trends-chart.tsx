"use client"

import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"

const data = [
  { month: "Feb", line: 4000, bar: 9000 },
  { month: "Apr", line: 8000, bar: 18000 },
  { month: "Jun", line: 16000, bar: 36000 },
]

export function MarketTrendsChart() {
  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#666" }} />
          <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#666" }} />
          <YAxis
            yAxisId="right"
            orientation="right"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: "#666" }}
          />
          <Bar yAxisId="left" dataKey="bar" fill="#fbbf24" opacity={0.8} />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="line"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}
