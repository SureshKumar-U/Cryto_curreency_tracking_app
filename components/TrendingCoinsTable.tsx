"use client"

import { useFetch } from "@/hooks/useFetch"
import Image from "next/image"
import { useEffect } from "react"
import { TrendingDown, TrendingUp } from 'lucide-react';
import { formatCurrency, formatPercentage } from "@/lib/utils";
import Link from "next/link";

const TrendingCoinsTable = () => {
    const { data, loading }: any = useFetch("search/trending")


    if (loading) {
        return (
            <div className=" bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
                <div className="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mx-auto mb-6"></div>
                    <p className="text-gray-700 font-medium text-lg">Loading Trending coins...</p>
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
        <div>
            <span className="font-bold ">Trending Coins</span>
            <div className="relative overflow-x-auto mt-2  shadow-lg rounded-md border-none">
                <table className="w-full text-sm text-left rtl:text-right text-body border-gray-200  bg:red-800">
                    <thead className="capitalize  bg-black text-white border-b rounded-base border-gray-300">
                        <tr>
                            <th scope="col" className="px-2 py-3 font-bold">
                                Name
                            </th>
                            <th scope="col" className="px-2 py-3 font-bold">
                                24h Change
                            </th>
                            <th scope="col" className="px-2 py-3 font-bold">
                                price
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.coins?.length &&
                            data?.coins?.slice(0, 5)?.map((coin: any) => {
                                const { item } = coin
                                const isTrendingUp = item?.data.price_change_percentage_24h.usd > 0;
                                            {console.log(formatCurrency(item.data.price))}

                                return (
                                    <tr key={item.id} className="bg-neutral-primary border-t border-gray-300">
                                        <td className="p-2">
                                            <Link href={`/coins/${item.id}`}>
                                                <Image className="inline me-2" src={item?.large} alt={item?.name} width={25} height={25} />
                                                <span>{item?.name}</span>
                                            </Link>
                                        </td>
                                        <td className="p-2">
                                            <p className={`flex capitalize items-center ${isTrendingUp ? "text-green-600" : "text-red-600"}`}>
                                                {formatPercentage(item.data.price_change_percentage_24h.usd)}
                                                {isTrendingUp ? (
                                                    <TrendingUp width={16} height={16} />
                                                ) : (
                                                    <TrendingDown width={16} height={16} />
                                                )}
                                            </p>
                                        </td>
                                        <td className="p-2">
                                           { formatCurrency(item.data.price)}
                                        </td>
                                    </tr>


                                )
                            })}

                    </tbody>
                </table>
            </div>

        </div>
    )
}


export default TrendingCoinsTable