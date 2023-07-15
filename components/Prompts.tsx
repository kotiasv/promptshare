"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"

type Props = {
    title: string
    description: string
    id?: string
    createdBy?: {
        name: string
        imageUrl: string
    }
}

const Prompts = ({ prompts }: { prompts: Props[] }) => {
    const [showPrompts, setShowPrompts] = useState(prompts)
    const router = useRouter()
    const handleFilter = (val: string) => {
        const value = val.toLowerCase()
        if (!value) {
            setShowPrompts(prompts)
            return
        }
        return setShowPrompts(prompts.filter(prompt => {
            if (
                prompt.title.toLowerCase().includes(value)
                || prompt.createdBy?.name.toLowerCase().includes(value)
            )
                return prompt
        }))
    }

    return (
        <>
            <input
                placeholder="Search for a title or a username"
                className="block mx-auto shadow-md mt-32 py-2 pl-5 w-[550px] border border-[#e5e7eb] text-lg"
                onChange={({ target }) => handleFilter(target.value)}
            />
            <section className="columns-3 p-2 mt-11 rounded-md">
                {showPrompts.map(({
                    title, createdBy, id
                }, i) => {
                    return <div
                        className="border-gray-300 h-fit break-inside-avoid p-5 border-[1px] w-[350px] mb-7 cursor-pointer"
                        key={`prompt-${title}-${i}`}
                        onClick={() => {
                            router.push(`/prompts/${id}`)
                        }}
                    >
                        <div className="flex gap-2 items-center">
                            <Image
                                className="rounded-full"
                                src={createdBy?.imageUrl || ""}
                                alt="Logo"
                                width={40}
                                height={40}
                            />
                            <h2 className="text-xl">{createdBy?.name}</h2>
                        </div>
                        <h3 className="mt-5 text-center font-medium text-2xl w-[300px] mb-2">
                            {title}
                        </h3>
                    </div>
                })}
            </section>
        </>
    )
}

export default Prompts