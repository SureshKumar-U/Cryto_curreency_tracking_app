'use client'

import Image from "next/image"
import Link from "next/link"
import Theme from "./Theme"

const Header = () => {
    return (
        <header className=" px-8 py-6 sticky top-0 z-10 flex justify-between border-b border-gray-300  dark:bg-black dark:text-white mb-3">
            <div className="flex items-center gap-x-3">
                <Link href="/">
                    <Image src="/cryptoTracker_logo.png" alt="image not loaded"
                        width={30} height={30} />
                </Link><span className="text-xl font-bold">CryptoTracker</span>
            </div>
            <div className="flex items-center justify-between gap-x-6 ">
                <Link href="/" className="text-md font-medium">Home</Link>
                <Link href="/coins" className="text-md font-medium">All coins</Link>
                <Theme/>
            </div>

        </header>
    )
}

export default Header