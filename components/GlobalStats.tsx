"use client"

import { useFetch } from "@/hooks/useFetch"
import { useEffect, useState } from "react"

const GlobalStats = () => {

  const { data:globalData, loading, error }: any = useFetch("global")

  return (
    <div>
      <p className="font-bold">Global Stats</p>

      <div className="grid grid-cols-2 gap-x-5 gap-y-7 mt-2">
        <div className="max-w-sm rounded-xl border border-gray-200 bg-white shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800">Total Market Cap</h3>
          <p className="mt-2 text-gray-600">
            ${globalData?.data?.total_market_cap?.usd?.toLocaleString()}
          </p>
        </div>

        <div className="max-w-sm rounded-xl border border-gray-200 bg-white shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800">Total Volume</h3>
          <p className="mt-2 text-gray-600">
            ${globalData?.data?.total_volume?.usd?.toLocaleString()}
          </p>
        </div>

        <div className="max-w-sm rounded-xl border border-gray-200 bg-white shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800">Active Cryptocurrencies</h3>
          <p className="mt-2 text-gray-600">
            {globalData?.data?.active_cryptocurrencies?.toLocaleString()}
          </p>
        </div>

        <div className="max-w-sm rounded-xl border border-gray-200 bg-white shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800">Markets</h3>
          <p className="mt-2 text-gray-600">
            {globalData?.data?.markets?.toLocaleString()}
          </p>
        </div>
      </div>

    </div>
  )
}

export default GlobalStats