"use client"

import { FormEvent, useState } from "react"
import { SessionInterface } from "@/types"
import { createPrompt, fetchToken } from "@/lib/actions"

const CreateForm = ({ session }: { session: SessionInterface | null }) => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        if (!session) return

        if (title.length < 2) return
        if (description.length < 10) return

        setLoading(true)

        try {
            const { token } = await fetchToken()
            await createPrompt({
                title,
                description
            }, session.user.id, token)

            setTitle("")
            setDescription("")
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    return session && (
        <form onSubmit={handleSubmit} className="flex flex-col mt-14 max-w-[650px] mx-auto">
            <label>
                <p className="text-3xl">Title</p>
                <input
                    type="text"
                    placeholder={"\"Write a customer case study\""}
                    value={title}
                    required
                    onChange={({ target }) => setTitle(target.value)}
                    className="mt-2 shadow-md w-full py-2 pl-5 border border-[#e5e7eb] text-lg"
                />
            </label>
            <label>
                <p className="text-3xl mt-5">Description</p>
                <textarea
                    placeholder={"\"As a marketing executive in a [Insert Industry] company, I\'m looking to write a customer case study that highlights how our [Product/Service] has helped our clients. I want to showcase the positive impact it has had on [Customer Profile], detailing their journey from the problems they were facing to the solutions we provided and the subsequent results.\""}
                    value={description}
                    required
                    onChange={({ target }) => setDescription(target.value)}
                    className="mt-2 shadow-md w-full py-2 px-5 border border-[#e5e7eb] min-h-[240px] text-lg resize-none"

                />
            </label>
            <button
                type="submit"
                className={`mt-10 bg-amber-500 py-4 rounded-md px-9 font-medium disabled:bg-gray-400`}
                disabled={loading}
            >
                Create
            </button>
        </form>
    )
}

export default CreateForm