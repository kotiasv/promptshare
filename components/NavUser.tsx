"use client"

import { UserProfile } from "@/types"
import { signOut } from "next-auth/react"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"

const DesktopBar = ({ user, router }: {
    user: UserProfile
    router: AppRouterInstance
}) => (
    <div className="hidden xs:flex gap-5">
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
            onClick={() => router.push("/create-prompt")}
        >
            Create Prompt
        </button>
        <button
            onClick={() => signOut()}
            className="border border-black px-4 rounded-md transition-all duration-300 hover:text-white hover:bg-black hover:scale-[1.03]"
        >
            Sign out
        </button>
    </div>
)

const MobileBar = ({ user, router }: {
    user: UserProfile
    router: AppRouterInstance
}) => {
    const [menu, setMenu] = useState(false)

    return (
        <div className="flex xs:hidden">
            <div className={`${menu ? "flex" : "hidden"} flex-col absolute top-12 -left-[205px] gap-4 bg-white border border-[#cdcfd3] p-4 rounded-md`}>
                <button
                    className="mt-3 font-medium py-2"
                    onClick={() => {
                        router.push("/profile")
                        setMenu(!menu)
                    }}
                >
                    Open Profile
                </button>
                <button
                    className="mt-3 px-6 font-medium border border-white text-white rounded-md transition-all duration-300 bg-gradient-to-l from-amber-500 to-orange-600 hover:bg-none hover:text-amber-500 hover:border-amber-500 hover:scale-[1.03] py-3"
                    onClick={() => {
                        router.push("/create-prompt")
                        setMenu(!menu)
                    }}
                >
                    Create Prompt
                </button>
                <button
                    onClick={() => signOut()}
                    className="border border-black px-6 rounded-md transition-all duration-300 hover:text-white hover:bg-black hover:scale-[1.03] py-3"
                >
                    Sign out
                </button>
            </div>
            <div onClick={() => setMenu(!menu)}>
                <Image
                    src={user.imageUrl}
                    width={45}
                    height={45}
                    alt="Icon"
                    className="rounded-full cursor-pointer"
                />
            </div>
        </div>
    )
}

const NavUser = ({ user }: { user: UserProfile }) => {
    const router = useRouter()
    return (
        <div className="relative">
            <DesktopBar
                user={user}
                router={router}
            />
            <MobileBar
                user={user}
                router={router}
            />
        </div>
    )
}

export default NavUser