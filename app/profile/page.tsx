import BackButton from "@/components/BackButton"
import ProfilePromptsCard from "@/components/ProfilePromptsCard"
import { getCurrentUser } from "@/lib/auth"
import Image from "next/image"


const page = async () => {
    const session = await getCurrentUser()
    const prompts = session.user.prompts.edges
    console.log(prompts)
    return session ? (
        <section>
            <BackButton />
            <h2 className="text-4xl mt-6 ml-11">Profile</h2>
            <Image
                src={session.user.imageUrl}
                alt="user"
                width={200}
                height={200}
                className="rounded-full mx-auto"
            />
            <h3 className="text-center text-4xl font-medium mt-3">
                {session.user.name}
            </h3>
            <h4 className="text-gray-600 text-center mt-1">
                {session.user.email}
            </h4>
            <h2 className="text-4xl mt-28 ml-11">Prompts</h2>
            {prompts.length ? (
                <div className="columns-3 mt-8">
                    {prompts.map(({ node: { title, id } }) => (
                        <ProfilePromptsCard
                            title={title as string}
                            id={id as string}
                            key={id}
                        />
                    ))}
                </div>
            ) : (
                <p className="text-center mt-28 text-3xl text-gray-500">
                    No Prompt Found
                </p>
            )}
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

export default page