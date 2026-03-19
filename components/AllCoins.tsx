"use client"

import { useFetch } from "@/hooks/useFetch"
import { formatCurrency, formatPercentage } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"

const AllCoins = ({pageNo}:{pageNo:number}) => {
    const { data: coinsData } = useFetch<CoinMarketData[]>(`coins/markets?vs_currency=usd&order=market_cap_desc&price_change_percentage=24h&per_page=10&page=${pageNo}`)

    const buildPageHref = (page: number) => `/coins?page=${page}`


    return (
        <>


            <div className="container mx-auto px-2 py-3">
                <p className="font-bold mt-2 ">All Coins</p>
                <div className="relative overflow-x-auto mt-2  shadow-lg rounded-md border-none">
                    <table className="w-full text-left rtl:text-right text-body border-gray-200">
                        <thead className="capitalize text-sm bg-black text-white border-b rounded-base border-gray-300">
                            <tr>
                                <th scope="col" className="p-2 font-bold">
                                    Rank
                                </th>
                                <th scope="col" className="p-2 font-bold">
                                    Token
                                </th>
                                <th scope="col" className="p-2 font-bold">
                                    Price
                                </th>
                                <th scope="col" className="p-2 font-bold">
                                    24h change
                                </th>
                                <th scope="col" className="p-2 font-bold">
                                    Market Cap
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {coinsData?.length ?
                                coinsData?.map((coin: any) => {
                                    const { market_cap_rank, price_change_percentage_24h, market_cap } = coin
                                    const isTrendingUp = price_change_percentage_24h > 0;
                                    return (
                                        <tr key={coin?.id} className="bg-neutral-primary border-t border-gray-300 text-sm ">
                                            <td className="p-2">
                                                <Link href={`/coins/${coin.id}`}>
                                                    <span>#{market_cap_rank}</span>
                                                </Link>
                                            </td>
                                            <td className="p-2">

                                                <Link href={`/coins/${coin.id}`}>
                                                    <Image className="inline me-3" src={coin.image} alt={coin.name} width={25} height={25} />
                                                    <span>
                                                        {coin.name} ({coin.symbol.toUpperCase()})
                                                    </span>
                                                </Link>

                                            </td>
                                            <td className="p-2">
                                                <span>{formatCurrency(coin.current_price)}</span>
                                            </td>
                                            <td>
                                                <span
                                                    className={`${isTrendingUp ? "text-green-500" : "text-red-500"}`}
                                                >
                                                    {isTrendingUp && '+'}
                                                    {formatPercentage(price_change_percentage_24h)}
                                                </span>
                                            </td>
                                            <td className="p-2">
                                                <span>{formatCurrency(market_cap)}</span>
                                            </td>
                                        </tr>


                                    )
                                })
                                :
                                <tr>

                                    <td className=" capitalize text-center">No coins Found</td>
                                </tr>}

                        </tbody>

                    </table>
                </div>
                <div className="flex items-center justify-between mt-4">
                    <span className="text-sm text-gray-600">Page {pageNo}</span>
                    <div className="flex gap-2">
                        <Link
                            href={pageNo > 1 ? buildPageHref(pageNo - 1) : buildPageHref(1)}
                            className={`px-3 py-2 text-xs rounded ${pageNo > 1 ? "bg-black text-white hover:bg-gray-800" : "bg-gray-200 text-gray-500 cursor-not-allowed"}`}
                            aria-disabled={pageNo <= 1}
                        >
                            Previous
                        </Link>
                        <Link
                            href={buildPageHref(pageNo + 1)}
                            className="px-3 py-2 text-xs rounded bg-black text-white hover:bg-gray-800"
                        >
                            Next
                        </Link>
                    </div>
                </div>


            </div>


        </>
    )
}


export default AllCoins