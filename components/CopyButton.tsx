"use client"

import { useState } from "react"

const CopyButton = ({ description }: {
    description: string
}) => {
    const [action, setAction] = useState<"Copy" | "Copied!">("Copy")
    return (
        <button
            onClick={() => {
                navigator.clipboard.writeText(description)
                setAction("Copied!")
            }}
            className="block mt-12 bg-orange-400 px-6 py-2 rounded-md text-lg text-black"
        >
            {action}
        </button>
    )
}

export default CopyButton