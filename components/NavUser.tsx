"use client"

import { UserProfile } from "@/types"
import { signOut } from "next-auth/react"

const NavUser = ({ user }: { user: UserProfile }) => {
    return (
        <button onClick={() => signOut()}>
            Sign out
        </button>
    )
}

export default NavUser