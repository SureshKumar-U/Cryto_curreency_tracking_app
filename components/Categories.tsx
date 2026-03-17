"use client"

import { useFetch } from "@/hooks/useFetch"
import { formatCurrency, formatPercentage } from "@/lib/utils"
import { Link, TrendingDown, TrendingUp } from "lucide-react"
import Image from "next/image"

const TopCategories = () => {
    const { data: categoryData, loading } = useFetch<Category[]>("coins/categories")


        if (loading) {
        return (
            <div className=" bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
                <div className="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mx-auto mb-6"></div>
                    <p className="text-gray-700 font-medium text-lg">Loading Top categories...</p>
                    <div className="mt-4 flex justify-center space-x-1">
                        <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            <p className="font-bold capitalize mt-5">Top categories</p>

            <div className="relative overflow-x-auto mt-2  shadow-lg rounded-md border-none">
                <table className="w-full text-sm text-left rtl:text-right text-body border border-gray-200">
                    <thead className="capitalize  bg-black text-white border-b rounded-base border-default">
                        <tr>
                            <th scope="col" className="p-2 font-bold">
                                Name
                            </th>
                            <th scope="col" className="p-2 font-bold">
                                Top Gainers
                            </th>
                            <th scope="col" className="p-2  font-bold">
                                24h Change
                            </th>
                            <th scope="col" className="p-2  font-bold">
                                Market Cap
                            </th>
                            <th scope="col" className="p-2 font-bold">
                                24h Volume
                            </th>

                        </tr>
                    </thead>
                    <tbody>
                        {categoryData?.length &&
                            categoryData?.slice(0, 10)?.map((category: Category, index: number) => {
                                const { name, top_3_coins, market_cap_change_24h } = category
                                const isTrendingUp = market_cap_change_24h > 0;
                                //             {console.log(formatCurrency(item.data.price))}

                                return (
                                    <tr key={index} className="text-sm bg-neutral-primary border-t border-gray-300">
                                        <td className="p-2">
                                            <span>{name}</span>

                                        </td>
                                        <td className="p-2 flex gap-x-1">
                                            {top_3_coins?.map((coin: string) => (
                                                <Image src={coin} alt={coin} key={coin} width={20} height={20} />
                                            ))},
                                        </td>
                                        <td className="p-2">
                                            <p className={`flex items-center ${isTrendingUp ? 'text-green-600' : "text-red-600"}`}>
                                                {formatPercentage(market_cap_change_24h)}
                                                {isTrendingUp ? (
                                                    <TrendingUp width={16} height={16} />
                                                ) : (
                                                    <TrendingDown width={16} height={16} />
                                                )}
                                            </p>
                                        </td>
                                        <td className="p-2">
                                            <p >
                                                {formatCurrency(category.market_cap)}
                                            </p>
                                        </td>
                                        <td className="p-2">
                                            <p >
                                                {formatCurrency(category.volume_24h)}
                                            </p>
                                        </td>

                                    </tr>


                                )
                            })}

                    </tbody>
                </table>
            </div>

        </>
    )
}

export default TopCategories