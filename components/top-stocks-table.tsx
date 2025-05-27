import { TrendingUp, TrendingDown } from "lucide-react"

const stocks = [
  { symbol: "AAPL", name: "Apple Inc.", price: "$150.25", change: "+2.50%", positive: true },
  { symbol: "MSFT", name: "Microsoft Corporation", price: "$305.75", change: "+1.80%", positive: true },
  { symbol: "GOOGL", name: "Alphabet Inc.", price: "$2750.00", change: "-0.50%", positive: false },
  { symbol: "AMZN", name: "Amazon.com Inc.", price: "$3380.50", change: "+1.20%", positive: true },
  { symbol: "TSLA", name: "Tesla Inc.", price: "$725.60", change: "+3.70%", positive: true },
]

export function TopStocksTable() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-4 text-sm font-medium text-gray-500 pb-2 border-b">
        <div>Symbol</div>
        <div>Name</div>
        <div>Price</div>
        <div>Change</div>
      </div>

      {stocks.map((stock) => (
        <div key={stock.symbol} className="grid grid-cols-4 gap-4 items-center py-2">
          <div className="font-medium">{stock.symbol}</div>
          <div className="text-sm text-gray-600">{stock.name}</div>
          <div className="font-medium">{stock.price}</div>
          <div
            className={`flex items-center text-sm font-medium ${stock.positive ? "text-green-600" : "text-red-600"}`}
          >
            {stock.positive ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
            {stock.change}
          </div>
        </div>
      ))}
    </div>
  )
}
