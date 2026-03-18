
"use client"

import { MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

const Theme = () => {

    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null
    
    console.log(theme)
    return (
        <>

            {theme !== "dark" ? <button onClick={() => setTheme("dark")} className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                <MoonIcon />
            </button> : <>  <button onClick={() => setTheme("dark")} className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                <SunIcon />

            </button>
            </>}



        </>
    )
}

export default Theme