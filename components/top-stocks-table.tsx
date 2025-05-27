import { TrendingUp, TrendingDown, Loader2 } from "lucide-react"

const STOCK_NAMES = {
  AAPL: "Apple Inc.",
  MSFT: "Microsoft Corporation",
  GOOGL: "Alphabet Inc.",
  AMZN: "Amazon.com Inc.",
  TSLA: "Tesla Inc.",
}

interface TopStocksTableProps {
  stocks: Array<{
    symbol: string
    data: any
    loading: boolean
    error: string | null
  }>
  loading: boolean
}

export function TopStocksTable({ stocks, loading }: TopStocksTableProps) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin mr-2" />
        <span>Loading stock data...</span>
      </div>
    )
  }

  // Sort stocks by performance (highest change first)
  const sortedStocks = [...stocks]
    .filter((stock) => stock.data)
    .sort((a, b) => {
      const changeA = ((a.data.c - a.data.pc) / a.data.pc) * 100
      const changeB = ((b.data.c - b.data.pc) / b.data.pc) * 100
      return changeB - changeA
    })

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-4 text-sm font-medium text-gray-500 pb-2 border-b">
        <div>Symbol</div>
        <div>Name</div>
        <div>Price</div>
        <div>Change</div>
      </div>

      {sortedStocks.map((stock) => {
        const changePercent = ((stock.data.c - stock.data.pc) / stock.data.pc) * 100
        const isPositive = changePercent >= 0

        return (
          <div key={stock.symbol} className="grid grid-cols-4 gap-4 items-center py-2">
            <div className="font-medium">{stock.symbol}</div>
            <div className="text-sm text-gray-600">{STOCK_NAMES[stock.symbol as keyof typeof STOCK_NAMES]}</div>
            <div className="font-medium">${stock.data.c.toFixed(2)}</div>
            <div className={`flex items-center text-sm font-medium ${isPositive ? "text-green-600" : "text-red-600"}`}>
              {isPositive ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
              {isPositive ? "+" : ""}
              {changePercent.toFixed(2)}%
            </div>
          </div>
        )
      })}

      {sortedStocks.length === 0 && <div className="text-center py-8 text-gray-500">No stock data available</div>}
    </div>
  )
}
