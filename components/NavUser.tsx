"use client"

import { createPrompt, fetchToken } from "@/lib/actions"
import { UserProfile } from "@/types"
import { signOut } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { useEffect } from "react"

const NavUser = ({ user }: { user: UserProfile }) => {
    const fetch = async () => {
        const { token } = await fetchToken()
        return token
    }

    const test = async () => {
        console.log("!")
        const { token } = await fetchToken()
        await createPrompt({
            title: "test",
            description: "124"
        }, user.id, token)
    }

    return (
        <div className="flex gap-5">
            <Image
                src={user.imageUrl}
                width={45}
                height={45}
                alt="Icon"
                className="rounded-full"
            />
            <button>
                <Link href="/create-prompt">
                    Create Prompt
                </Link>
            </button>
            <button onClick={() => signOut()}>
                Sign out
            </button>
            <button onClick={test}>
                Upload
            </button>
        </div>
    )
}

export default NavUser