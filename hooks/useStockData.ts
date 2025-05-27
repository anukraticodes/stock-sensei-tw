"use client"

import { useState, useEffect } from "react"
import axios from "axios"

const API_URL = "https://finnhub.io/api/v1/quote"
const API_KEY = "d0qnefpr01qg1llaphjgd0qnefpr01qg1llaphk0" // Replace with your Finnhub API Key

export const useStockData = (symbol: string) => {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchStock = async () => {
      try {
        const response = await axios.get(`${API_URL}?symbol=${symbol}&token=${API_KEY}`)
        setData(response.data)
      } catch (err) {
        setError("Failed to fetch stock data")
      } finally {
        setLoading(false)
      }
    }

    fetchStock()
    const interval = setInterval(fetchStock, 60000) // Update every minute
    return () => clearInterval(interval) // Clean up on unmount
  }, [symbol])

  return { data, loading, error }
}
