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
            <p>Loading... </p>
        )
    }
    return (
        <>
            <Image className="inline" src="/trending.png" alt={"trendngimag.png"} width={15} height={15} />
            <span className="font-bold ">Trending Coins</span>

            <div className="relative overflow-x-auto mt-2  shadow-lg rounded-md border-none">
                <table className="w-full text-xs text-left rtl:text-right text-body">
                    <thead className="capitalize text-body bg-black text-white border-b rounded-base border-default">
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
                                    <tr key={item.id} className="bg-neutral-primary border-b border-default">
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

        </>
    )
}


export default TrendingCoinsTable