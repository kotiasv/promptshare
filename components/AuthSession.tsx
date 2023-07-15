"use client"

import { Providers, Provider } from "@/types"
import { signIn, getProviders } from "next-auth/react"
import Image from "next/image"
import { useState, useEffect } from "react"

const AuthSession = () => {
    const [providers, setProviders] = useState<Providers | null>(null)

    useEffect(() => {
        const fetchProviders = async () => {
            const res = await getProviders()
            setProviders(res)
        }
        fetchProviders()
    }, [])

    return (
        <div>
            {providers && Object.values(providers).map((provider: Provider, i) => (
                <button
                    key={`auth-${i}`}
                    onClick={() => signIn(provider?.id)}
                    className="bg-black border border-white hover:scale-[1.03] transition-transform duration-300 text-white flex items-center gap-2 py-2 px-4 rounded-md"
                >
                    <Image
                        src="/github.svg"
                        alt="github"
                        width={25}
                        height={20}
                    />
                    Sign In
                </button>
            ))}
        </div>
    )
}

export default AuthSession