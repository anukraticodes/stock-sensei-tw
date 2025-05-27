"use client";

import { Sidebar } from "@/components/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, TrendingUp, TrendingDown, Loader2 } from "lucide-react"
import { PortfolioChart } from "@/components/portfolio-chart"
import { TopStocksTable } from "@/components/top-stocks-table"
import { useMultipleStocks } from "@/hooks/useMultipleStocks"

// Portfolio holdings (shares owned)
const PORTFOLIO_HOLDINGS = {
  AAPL: 10,
  MSFT: 5,
  GOOGL: 2,
  AMZN: 3,
  TSLA: 8,
}

export default function DashboardPage() {
  const { stocks, allLoading, hasError } = useMultipleStocks()

  // Calculate portfolio value
  const portfolioValue = stocks.reduce((total, stock) => {
    if (stock.data && PORTFOLIO_HOLDINGS[stock.symbol as keyof typeof PORTFOLIO_HOLDINGS]) {
      const shares = PORTFOLIO_HOLDINGS[stock.symbol as keyof typeof PORTFOLIO_HOLDINGS]
      return total + stock.data.c * shares // 'c' is current price in Finnhub API
    }
    return total
  }, 0)

  // Calculate portfolio change (using previous close vs current)
  const portfolioChange = stocks.reduce((total, stock) => {
    if (stock.data && PORTFOLIO_HOLDINGS[stock.symbol as keyof typeof PORTFOLIO_HOLDINGS]) {
      const shares = PORTFOLIO_HOLDINGS[stock.symbol as keyof typeof PORTFOLIO_HOLDINGS]
      const currentValue = stock.data.c * shares
      const previousValue = stock.data.pc * shares // 'pc' is previous close
      return total + (currentValue - previousValue)
    }
    return total
  }, 0)

  const portfolioChangePercent = portfolioValue > 0 ? (portfolioChange / (portfolioValue - portfolioChange)) * 100 : 0

  // Get market sentiment based on overall stock performance
  const positiveStocks = stocks.filter((stock) => stock.data && stock.data.c > stock.data.pc).length

  const marketSentiment = positiveStocks >= 3 ? "Positive" : positiveStocks >= 2 ? "Neutral" : "Negative"
  const sentimentColor =
    marketSentiment === "Positive"
      ? "text-green-600"
      : marketSentiment === "Neutral"
        ? "text-yellow-600"
        : "text-red-600"

  // Generate stock recommendations based on price changes
  const getRecommendation = (stock: any) => {
    if (!stock.data) return "Hold"
    const changePercent = ((stock.data.c - stock.data.pc) / stock.data.pc) * 100
    if (changePercent > 2) return "Buy"
    if (changePercent < -2) return "Sell"
    return "Hold"
  }

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

          {hasError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-800">Error loading stock data. Please check your connection and try again.</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Portfolio Overview</CardDescription>
                <CardTitle className="text-sm font-medium text-gray-600">
                  Your current portfolio value and performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                {allLoading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="text-lg">Loading...</span>
                  </div>
                ) : (
                  <>
                    <div className="text-3xl font-bold">
                      ${portfolioValue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                    <div
                      className={`flex items-center text-sm mt-1 ${portfolioChange >= 0 ? "text-green-600" : "text-red-600"}`}
                    >
                      {portfolioChange >= 0 ? (
                        <TrendingUp className="h-4 w-4 mr-1" />
                      ) : (
                        <TrendingDown className="h-4 w-4 mr-1" />
                      )}
                      {portfolioChangePercent >= 0 ? "+" : ""}
                      {portfolioChangePercent.toFixed(2)}% today
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Market Sentiment</CardDescription>
                <CardTitle className="text-sm font-medium text-gray-600">Overall market sentiment analysis</CardTitle>
              </CardHeader>
              <CardContent>
                {allLoading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Loading...</span>
                  </div>
                ) : (
                  <>
                    <div className={`text-2xl font-bold ${sentimentColor}`}>{marketSentiment}</div>
                    <div className="text-sm text-gray-600 mt-1">
                      {positiveStocks} out of {stocks.length} stocks are up today
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Stock Recommendations</CardDescription>
                <CardTitle className="text-sm font-medium text-gray-600">AI-powered stock suggestions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {allLoading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="text-sm">Loading...</span>
                  </div>
                ) : (
                  stocks.slice(0, 3).map((stock) => {
                    const recommendation = getRecommendation(stock)
                    const recColor =
                      recommendation === "Buy"
                        ? "text-green-600"
                        : recommendation === "Sell"
                          ? "text-red-600"
                          : "text-yellow-600"

                    return (
                      <div key={stock.symbol} className="flex justify-between items-center">
                        <span className="font-medium">{stock.symbol}</span>
                        <span className={`font-medium ${recColor}`}>{recommendation}</span>
                      </div>
                    )
                  })
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Recent Alerts</CardDescription>
                <CardTitle className="text-sm font-medium text-gray-600">Your latest stock alerts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {allLoading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="text-sm">Loading...</span>
                  </div>
                ) : (
                  <>
                    {stocks
                      .map((stock) => {
                        if (!stock.data) return null
                        const changePercent = ((stock.data.c - stock.data.pc) / stock.data.pc) * 100

                        if (Math.abs(changePercent) > 3) {
                          return (
                            <div key={stock.symbol} className="text-sm">
                              <div className="font-medium">
                                {stock.symbol} {changePercent > 0 ? "surged" : "dropped"}{" "}
                                {Math.abs(changePercent).toFixed(1)}% today
                              </div>
                            </div>
                          )
                        }
                        return null
                      })
                      .filter(Boolean)
                      .slice(0, 2)}

                    {stocks.filter((stock) => {
                      if (!stock.data) return false
                      const changePercent = ((stock.data.c - stock.data.pc) / stock.data.pc) * 100
                      return Math.abs(changePercent) > 3
                    }).length === 0 && <div className="text-sm text-gray-500">No significant alerts today</div>}
                  </>
                )}
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
                <TopStocksTable stocks={stocks} loading={allLoading} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
