"use client"

import { useFetch } from "@/hooks/useFetch"
import { useEffect, useState } from "react"

const TopGainers = () => {

  const [topGainers, setTopGainers] = useState()

  const { data, loading, error }: any = useFetch("coins/markets?vs_currency=usd&order=market_cap_desc&price_change_percentage=24h&per_page=250&page=1")


  useEffect(() => {
    if (data) {
      if (data?.length == 0) return
      const topGainers = data
        .sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h)
        .slice(0, 5);
      setTopGainers(topGainers)
    }
  }, [data])

console.log(topGainers)

  return (
    <>
      <p className="font-bold"> 🚀 Top Gainers </p>

      <div className="max-w-sm rounded-xl border border-gray-200 bg-white shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800">Card Title</h3>
        <p className="mt-2 text-gray-600">
          This is a simple card built with Tailwind CSS. You can place any content here.
        </p>

        <button className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
          Action
        </button>
      </div>

    </>
  )
}

export default TopGainers