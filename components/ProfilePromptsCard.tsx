"use client"

import { deletePrompt, fetchToken } from "@/lib/actions"
import Image from "next/image"
import { useRouter } from "next/navigation"

const ProfilePromptsCard = ({ title, id }: {
    title: string
    id: string
}) => {
    const router = useRouter()

    const handleDelete = async () => {
        const { token } = await fetchToken()
        await deletePrompt(id, token)

        router.refresh()
    }

    return (
        <div className="relative">
            <div
                className="flex justify-center py-8 border-gray-300 border break-inside-avoid mb-10 cursor-pointer"
                onClick={() => router.push(`/prompts/${id}`)}
            >
                <h3
                    className="text-center font-medium text-2xl w-[300px]"
                >
                    {title}
                </h3>
            </div>
            <div
                className="absolute top-2 right-2 cursor-pointer"
                onClick={() => handleDelete()}
            >
                <Image
                    src="/delete.svg"
                    alt="Delete"
                    width={30}
                    height={30}
                    className="bg-clip-text bg-red-400 text-transparent"
                />
            </div>
        </div>
    )
}

export default ProfilePromptsCard