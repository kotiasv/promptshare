import { Session, User } from "next-auth"

export type emailsProp = {
    email: string
    primary: boolean
    verified: boolean
    visibility: string | null
}[]

export type UserPrompts = {
    node: {
        title: string
        description: string
        id?: string
        createdBy?: {
            name: string
            imageUrl: string
        }
    }
}

export interface Prompts extends UserPrompts {
    createdBy: {
        id: string
        email: string
        name: string
        avatarUrl: string
    }
}

export type UserProfile = User & {
    name: string
    email: string
    imageUrl: string
    prompts?: {
        edges: UserPrompts[]
    }
    id: string
}

export interface SessionInterface extends Session {
    user: User & {
        name: string
        imageUrl: string
        email: string
        prompts: {
            edges: UserPrompts[] | []
        }
    }
}

export type Provider = {
    id: string,
    name: string
    type: string
    signinUrl: string
    callbackUrl: string
    signinUrlParams?: Record<string, string> | null
}
export type Providers = Record<string, Provider>

export type PromptForm = {
    title: string
    description: string
}