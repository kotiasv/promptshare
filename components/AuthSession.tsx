"use client"

import { Providers, Provider } from "@/types"
import { signIn, getProviders } from "next-auth/react"
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
                >
                    Sign in
                </button>
            ))}
        </div>
    )
}

export default AuthSession