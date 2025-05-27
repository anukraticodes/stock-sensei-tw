import { useStockData } from "./useStockData"

const STOCK_SYMBOLS = ["AAPL", "MSFT", "GOOGL", "AMZN", "TSLA"]

export const useMultipleStocks = () => {
  const stocksData = STOCK_SYMBOLS.map((symbol) => {
    const stockData = useStockData(symbol)
    return {
      symbol,
      data: stockData.data,
      loading: stockData.loading,
      error: stockData.error,
    }
  })

  const allLoading = stocksData.some((stock) => stock.loading)
  const hasError = stocksData.some((stock) => stock.error)

  return {
    stocks: stocksData,
    allLoading,
    hasError,
  }
}
