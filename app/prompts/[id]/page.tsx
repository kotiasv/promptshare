import BackButton from "@/components/BackButton"
import { getPromptsById } from "@/lib/actions"
import Image from "next/image"

const page = async ({ params: { id } }: {
    params: { id: string }
}) => {
    const { prompt } = await getPromptsById(id)
    console.log(prompt)
    return (
        <section className="">
            <BackButton />
            <div className="flex items-center gap-4 mt-14 ml-4">
                <Image
                    src={prompt.createdBy.imageUrl}
                    alt="logo"
                    width={50}
                    height={50}
                    className="rounded-full"
                />
                <p className="text-2xl">
                    {prompt.createdBy.name}
                </p>
            </div>
            <h1 className="mt-24 text-4xl font-medium text-center">
                {prompt.title}
            </h1>
            <p>
                {prompt.description}
            </p>
        </section>
    )
}

export default page