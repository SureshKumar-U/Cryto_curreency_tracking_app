"use client"

import { useFetch } from "@/hooks/useFetch"
import { formatCurrency, formatPercentage } from "@/lib/utils"
import { Link, TrendingDown, TrendingUp } from "lucide-react"
import Image from "next/image"

const TopCategories = () => {
    const { data: categoryData, loading } = useFetch<Category[]>("coins/categories")


    return (
        <>
            <span className="font-bold capitalize ">Top categories</span>

            <div className="relative overflow-x-auto mt-2  shadow-lg rounded-md border-none">
                <table className="w-full text-xs text-left rtl:text-right text-body">
                    <thead className="capitalize text-body bg-black text-white border-b rounded-base border-default">
                        <tr>
                            <th scope="col" className="px-2 py-3 font-bold">
                                Name
                            </th>
                            <th scope="col" className="px-2 py-3 font-bold">
                                Top Gainers
                            </th>
                            <th scope="col" className="px-2 py-3 font-bold">
                                24h Change
                            </th>
                            <th scope="col" className="px-2 py-3 font-bold">
                                Market Cap
                            </th>
                            <th scope="col" className="px-2 py-3 font-bold">
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
                                    <tr key={index} className="bg-neutral-primary border-t border-default">
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