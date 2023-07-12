import { Session, User } from "next-auth"

export type emailsProp = {
    email: string
    primary: boolean
    verified: boolean
    visibility: string | null
}[]

export type UserProfile = User & {
    name: string
    email: string
    imageUrl: string
    prompts?: any[]
    id: string
}

export interface SessionInterface extends Session {
    user: User & {
        name: string
        imageUrl: string
        email: string
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
