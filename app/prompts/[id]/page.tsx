import BackButton from "@/components/BackButton"
import CopyButton from "@/components/CopyButton"
import { getPromptsById } from "@/lib/actions"
import Image from "next/image"

const page = async ({ params: { id } }: {
    params: { id: string }
}) => {
    const { prompt } = await getPromptsById(id)
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
            <p className="mt-10 text-xl max-w-5xl leading-8 xs:text-2xl text-gray-700 mx-auto px-3">
                {prompt.description}
                <CopyButton description={prompt.description} />
            </p>
        </section>
    )
}

export default page