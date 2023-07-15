import Prompts from "@/components/Prompts"
import { getPrompts } from "@/lib/actions"
import { UserPrompts } from "@/types"

type promptProps = {
    promptCollection: {
        edges: UserPrompts[]
    }
}

const getFormatedPrompts = async () => {
    // @ts-ignore
    const res: promptProps = await getPrompts()
    const prompts = res.promptCollection.edges.map(prompt => prompt.node)
    return prompts
}

const Home = async () => {
    const prompts = await getFormatedPrompts()
    return (
        <main className="">
            <h1 className="max-w-[600px] mx-auto mt-6 text-center text-6xl font-bold">
                Discover & Share <span className="bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-500 bg-clip-text text-transparent">ChatGPT Prompts</span>
            </h1>
            <Prompts
                prompts={prompts}
            />
        </main>
    )
}

export default Home