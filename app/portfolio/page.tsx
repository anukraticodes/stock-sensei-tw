"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { PortfolioChatbot } from "@/components/portfolio-chatbot"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MarketTrendsChart } from "@/components/market-trends-chart"
import { Button } from "@/components/ui/button"
import { CheckCircle, Clock, Calendar, ArrowRight } from "lucide-react"

export default function PortfolioPage() {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false)

  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen)
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Market Trends Section */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle>Market Trends</CardTitle>
                <CardDescription>Performance of major indices</CardDescription>
              </CardHeader>
              <CardContent>
                <MarketTrendsChart />
              </CardContent>
            </Card>

            {/* Upcoming Tasks & Alerts Section */}
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Tasks & Alerts</CardTitle>
                <CardDescription>Important dates and events</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <div>
                    <div className="font-medium">Portfolio Review - 2023-07-15</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                  <Clock className="h-5 w-5 text-orange-600" />
                  <div>
                    <div className="font-medium">Tax Filing Deadline - 2023-07-31</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  <div>
                    <div className="font-medium">Dividend Payout - 2023-08-05</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* AI-Powered Insights Section */}
            <Card>
              <CardHeader>
                <CardTitle>AI-Powered Insights</CardTitle>
                <CardDescription>Personalized recommendations for your portfolio</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-blue-600 font-medium text-sm">Insight 1:</div>
                  <div className="text-sm text-gray-600 mt-1">
                    Your portfolio has outperformed the S&P 500 by 2.5% this month.
                  </div>
                </div>

                <div>
                  <div className="text-blue-600 font-medium text-sm">Insight 2:</div>
                  <div className="text-sm text-gray-600 mt-1">
                    Consider diversifying into technology stocks for potential growth.
                  </div>
                </div>

                <div>
                  <div className="text-blue-600 font-medium text-sm">Insight 3:</div>
                  <div className="text-sm text-gray-600 mt-1">
                    Your risk level has increased. Review your asset allocation.
                  </div>
                </div>

                <Button className="w-full mt-4 bg-gray-900 hover:bg-gray-800">
                  See More Insights
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* AI Portfolio Assistant Section */}
          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>AI Portfolio Assistant</CardTitle>
                <CardDescription>Get personalized investment advice and portfolio recommendations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-sm text-muted-foreground">Our AI assistant can help you with:</div>
                <ul className="text-sm space-y-2">
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 bg-blue-600 rounded-full" />
                    Portfolio diversification strategies
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 bg-blue-600 rounded-full" />
                    Risk assessment and management
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 bg-blue-600 rounded-full" />
                    Asset allocation recommendations
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 bg-blue-600 rounded-full" />
                    Market analysis and insights
                  </li>
                </ul>
                <Button onClick={toggleChatbot} className="w-full">
                  Start Chat with AI Assistant
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Chatbot Component */}
      <PortfolioChatbot isOpen={isChatbotOpen} onToggle={toggleChatbot} />
    </div>
  )
}
