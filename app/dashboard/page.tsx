import { Sidebar } from "@/components/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, TrendingUp } from "lucide-react"
import { PortfolioChart } from "@/components/portfolio-chart"
import { TopStocksTable } from "@/components/top-stocks-table"

export default function DashboardPage() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600 mt-1">Welcome to your investment dashboard.</p>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input placeholder="Search..." className="pl-10 w-80" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Portfolio Overview</CardDescription>
                <CardTitle className="text-sm font-medium text-gray-600">
                  Your current portfolio value and performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">$10,234.56</div>
                <div className="flex items-center text-sm text-green-600 mt-1">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  2.5% from last week
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Market Sentiment</CardDescription>
                <CardTitle className="text-sm font-medium text-gray-600">Overall market sentiment analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">Positive</div>
                <div className="text-sm text-gray-600 mt-1">Based on recent market trends and news</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Stock Recommendations</CardDescription>
                <CardTitle className="text-sm font-medium text-gray-600">AI-powered stock suggestions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">AAPL</span>
                  <span className="text-green-600 font-medium">Buy</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">GOOGL</span>
                  <span className="text-yellow-600 font-medium">Hold</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">TSLA</span>
                  <span className="text-red-600 font-medium">Sell</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Recent Alerts</CardDescription>
                <CardTitle className="text-sm font-medium text-gray-600">Your latest stock alerts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-sm">
                  <div className="font-medium">AAPL reached your target price of $150</div>
                </div>
                <div className="text-sm">
                  <div className="font-medium">TSLA dropped below your stop loss of $200</div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Portfolio Performance</CardTitle>
                <CardDescription>Your portfolio performance over time</CardDescription>
              </CardHeader>
              <CardContent>
                <PortfolioChart />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Stocks</CardTitle>
                <CardDescription>{"Today's best performing stocks"}</CardDescription>
              </CardHeader>
              <CardContent>
                <TopStocksTable />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
