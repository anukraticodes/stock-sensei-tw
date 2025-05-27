import { Sidebar } from "@/components/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function LearningPage() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Learning Guide</h1>
            <p className="text-gray-600 mt-1">Expand your investment knowledge.</p>
          </div>

          <div className="mb-6">
            <Select defaultValue="all">
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Introduction to Investing</CardTitle>
                <CardDescription>Learn the basics of investing and why {"it's"} important.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 mb-6">
                  <Button variant="outline" size="sm">
                    Modules
                  </Button>
                  <Button variant="ghost" size="sm">
                    Quiz
                  </Button>
                </div>

                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    <span className="text-sm">What is investing?</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    <span className="text-sm">Types of investments</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    <span className="text-sm">Risk and return</span>
                  </li>
                </ul>

                <Button className="bg-gray-900 hover:bg-gray-800">Start Learning</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Stock Market Basics</CardTitle>
                <CardDescription>
                  Understand how the stock market works and how to start investing in stocks.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 mb-6">
                  <Button variant="outline" size="sm">
                    Modules
                  </Button>
                  <Button variant="ghost" size="sm">
                    Quiz
                  </Button>
                </div>

                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    <span className="text-sm">What are stocks?</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    <span className="text-sm">How to buy stocks</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    <span className="text-sm">Reading stock charts</span>
                  </li>
                </ul>

                <Button className="bg-gray-900 hover:bg-gray-800">Start Learning</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
