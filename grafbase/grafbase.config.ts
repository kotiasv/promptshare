import { g, auth, config } from "@grafbase/sdk"

const User = g.model("User", {
    name: g.string().length({ min: 2, max: 20 }),
    email: g.string().unique(),
    avararUrl: g.url(),
    prompts: g
        .relation(() => Prompt)
        .list()
        .optional()
})

const Prompt = g.model("Prompt", {
    title: g.string().length({ min: 2, max: 40 }),
    description: g.string(),
    createdBy: g.relation(() => User)
})

export default config({
    schema: g
})
