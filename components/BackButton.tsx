"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"

const BackButton = () => {
    const router = useRouter()
    return (
        <button
            onClick={() => router.push("/")}
            className="flex gap-1 text-2xl items-center ml-4"
        >
            <Image
                src="/back.svg"
                width={20}
                height={20}
                alt="Back"
                className=""
            />
            Back
        </button>
    )
}

export default BackButton