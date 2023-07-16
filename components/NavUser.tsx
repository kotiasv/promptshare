"use client"

import { UserProfile } from "@/types"
import { signOut } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

const NavUser = ({ user }: { user: UserProfile }) => {
    const router = useRouter()
    return (
        <div className="flex gap-5">
            <Image
                src={user.imageUrl}
                width={45}
                height={45}
                alt="Icon"
                className="rounded-full cursor-pointer"
                onClick={() => router.push("/profile")}
            />
            <button
                className="px-4 py-1 font-medium border border-white text-white rounded-md transition-all duration-300 bg-gradient-to-l from-amber-500 to-orange-600 hover:bg-none hover:text-amber-500 hover:border-amber-500 hover:scale-[1.03]"
            >
                <Link href="/create-prompt">
                    Create Prompt
                </Link>
            </button>
            <button
                onClick={() => signOut()}
                className="border border-black px-4 rounded-md transition-all duration-300 hover:text-white hover:bg-black hover:scale-[1.03]"
            >
                Sign out
            </button>
        </div>
    )
}

export default NavUser