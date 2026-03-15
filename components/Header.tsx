import Image from "next/image"
import Link from "next/link"

const Header = () => {
    return (
        <header className=" px-6 py-4 flex justify-between border-b border-default">
            <div className="flex items-center gap-x-1">
                <Link href="/">
                    <Image src="/cryptoTracker_logo.png" alt="image not loaded"
                        width={30} height={30} />
                </Link><span className="text-2xl font-bold">CryptoTracker</span>
            </div>
            <div className="flex items-center justify-between gap-x-3">
                <Link href="/">Home</Link>
                <Link href="/">search</Link>
                <Link href="/">All coins</Link>
            </div>

        </header>
    )
}

export default Header