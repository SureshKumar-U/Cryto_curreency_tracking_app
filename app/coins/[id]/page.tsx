"use client"

import { useFetch } from "@/hooks/useFetch"
import { formatCurrency, formatPercentage } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { TrendingDown, TrendingUp, ArrowLeft } from 'lucide-react'
import { useParams } from "next/navigation"

const CoinDetails = () => {
    const params = useParams()
    const coinId = params.id as string

    const { data: coinData, loading, error } = useFetch<any>(`coins/${coinId}`)

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
                <div className="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mx-auto mb-6"></div>
                    <p className="text-gray-700 font-medium text-lg">Loading coin details...</p>
                    <div className="mt-4 flex justify-center space-x-1">
                        <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center">
                <div className="text-center bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl max-w-md">
                    <div className="text-red-500 mb-4">
                        <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Oops! Something went wrong</h2>
                    <p className="text-red-600 mb-6">Error loading coin details. Please try again.</p>
                    <Link href="/coins" className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-medium">
                        <ArrowLeft size={18} />
                        Back to Coins
                    </Link>
                </div>
            </div>
        )
    }

    if (!coinData) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 flex items-center justify-center">
                <div className="text-center bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl max-w-md">
                    <div className="text-gray-400 mb-4">
                        <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Coin Not Found</h2>
                    <p className="text-gray-600 mb-6">The coin you're looking for doesn't exist or has been delisted.</p>
                    <Link href="/coins" className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                        <ArrowLeft size={18} />
                        Back to Coins
                    </Link>
                </div>
            </div>
        )
    }
    const {
        name,
        symbol,
        image,
        market_data,
        market_cap_rank,
        description
    } = coinData

    
    const isPriceUp = market_data?.price_change_percentage_24h > 0

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
            <div className="container mx-auto px-4 py-8">
                {/* Back Button */}
                <Link
                    href="/coins"
                    className="inline-flex items-center gap-2 text-gray-700 hover:text-blue-600 mb-8 transition-all duration-200 hover:scale-105 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm"
                >
                    <ArrowLeft size={20} />
                    <span className="font-medium">Back to Coins</span>
                </Link>

                {/* Coin Header */}
                <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-8 mb-8 border border-white/20">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                        <div className="flex items-center gap-6">
                            <div className="relative">
                                <Image
                                    src={image?.large || image}
                                    alt={name}
                                    width={80}
                                    height={80}
                                    className="rounded-full shadow-lg ring-4 ring-blue-100"
                                />
                                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
                            </div>
                            <div>
                                <h1 className="text-4xl font-bold text-gray-900 mb-1">{name}</h1>
                                <p className="text-xl text-gray-600 uppercase font-semibold tracking-wide">{symbol}</p>
                                <div className="flex items-center gap-2 mt-2">
                                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                                        Rank #{market_cap_rank}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="text-center lg:text-right">
                            <div className="text-4xl font-bold text-gray-900 mb-3">
                                {formatCurrency(market_data?.current_price?.usd)}
                            </div>
                            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-lg ${
                                isPriceUp
                                    ? 'bg-green-100 text-green-700 border border-green-200'
                                    : 'bg-red-100 text-red-700 border border-red-200'
                            }`}>
                                {isPriceUp ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
                                <span>{isPriceUp ? '+' : ''}{formatPercentage(market_data?.price_change_percentage_24h)}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Price Statistics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-white/20 hover:shadow-2xl transition-all duration-300 hover:scale-105 group">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                </svg>
                            </div>
                            <h3 className="text-sm font-semibold text-gray-600">Market Cap</h3>
                        </div>
                        <p className="text-2xl font-bold text-gray-900">{formatCurrency(market_data?.market_cap?.usd)}</p>
                    </div>

                    <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-white/20 hover:shadow-2xl transition-all duration-300 hover:scale-105 group">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                                </svg>
                            </div>
                            <h3 className="text-sm font-semibold text-gray-600">24h Volume</h3>
                        </div>
                        <p className="text-2xl font-bold text-gray-900">{formatCurrency(market_data?.total_volume?.usd)}</p>
                    </div>

                    <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-white/20 hover:shadow-2xl transition-all duration-300 hover:scale-105 group">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                                <TrendingUp className="w-5 h-5 text-green-600" />
                            </div>
                            <h3 className="text-sm font-semibold text-gray-600">24h High</h3>
                        </div>
                        <p className="text-2xl font-bold text-green-600">{formatCurrency(market_data?.high_24h?.usd)}</p>
                    </div>

                    <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-white/20 hover:shadow-2xl transition-all duration-300 hover:scale-105 group">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center group-hover:bg-red-200 transition-colors">
                                <TrendingDown className="w-5 h-5 text-red-600" />
                            </div>
                            <h3 className="text-sm font-semibold text-gray-600">24h Low</h3>
                        </div>
                        <p className="text-2xl font-bold text-red-600">{formatCurrency(market_data?.low_24h?.usd)}</p>
                    </div>
                </div>

                {/* Supply Information */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-white/20">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">Supply Information</h3>
                        </div>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                                <span className="text-gray-700 font-medium">Circulating Supply</span>
                                <span className="font-bold text-gray-900">{formatCurrency(market_data?.circulating_supply, 0, 'USD', false)}</span>
                            </div>
                            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                                <span className="text-gray-700 font-medium">Total Supply</span>
                                <span className="font-bold text-gray-900">
                                    {formatCurrency(market_data?.total_supply, 0, 'USD', false)}
                                </span>
                            </div>
                            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                                <span className="text-gray-700 font-medium">Max Supply</span>
                                <span className="font-bold text-gray-900">
                                    { formatCurrency(market_data?.max_supply, 0, 'USD', false)}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Placeholder for Chart */}
                    <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-white/20">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                                <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">Price Chart</h3>
                        </div>
                        <div className="h-64 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300">
                            <div className="text-center">
                                <svg className="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                                <p className="text-gray-500 font-medium">Interactive chart coming soon</p>
                                <p className="text-sm text-gray-400 mt-1">Price history visualization</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Description */}
                {description?.en && (
                    <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-white/20">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                                <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">About {name}</h3>
                        </div>
                        <div
                            className="text-gray-700 leading-relaxed prose prose-sm max-w-none prose-headings:text-gray-900 prose-headings:font-semibold prose-p:text-gray-700 prose-p:leading-relaxed prose-strong:text-gray-900 prose-strong:font-semibold prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline"
                            dangerouslySetInnerHTML={{ __html: description.en }}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}

export default CoinDetails