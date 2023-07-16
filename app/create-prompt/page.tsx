// "use client"

import BackButton from "@/components/BackButton"
import CreateForm from "@/components/CreateForm"
import { getCurrentUser } from "@/lib/auth"

const CreatePromptPage = async () => {
    const session = await getCurrentUser()

    return session ? (
        <section>
            <BackButton />
            <h2 className="text-4xl mt-6 font-medium ml-8">Create Prompt</h2>
            <CreateForm session={session} />
        </section>
    ) : (
        <section className="text-center text-4xl">
            <BackButton />
            <p className="mt-72 text-gray-500">
                Sign In to create prompts
            </p>
        </section>
    )

}

export default CreatePromptPage