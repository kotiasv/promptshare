import { g, auth, config } from "@grafbase/sdk"

// @ts-ignore
const User = g.model("User", {
    name: g.string().length({ min: 2, max: 20 }),
    email: g.string().unique(),
    imageUrl: g.url(),
    prompts: g
        .relation(() => Prompt)
        .list()
        .optional()
}).auth((rules) => {
    rules.public().read()
})

// @ts-ignore
const Prompt = g.model("Prompt", {
    title: g.string().length({ min: 2, max: 40 }),
    description: g.string(),
    createdBy: g.relation(() => User)
}).auth((rules) => {
    rules.public().read()
    rules
        .private()
        .create()
        .delete()
        .update()
})

const jwt = auth.JWT({
    issuer: "grafbase",
    secret: g.env("NEXTAUTH_SECRET")
})

export default config({
    schema: g,
    auth: {
        providers: [jwt],
        rules: (rules) => rules.private()
    }
})
