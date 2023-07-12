import axios from "axios"
import { NextAuthOptions, getServerSession } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import { createUser, getUser } from "./actions"
import jsonwebtoken from "jsonwebtoken"
import { JWT } from "next-auth/jwt"

import { emailsProp, SessionInterface, UserProfile } from "@/types"

const fetchDiscordEmail = async (token: string) => {
    const res = await axios
        .get("https://api.github.com/user/public_emails", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    const emails: emailsProp = res.data

    if (!emails || emails.length === 0)
        return null

    const sortedEmail = emails.find(email => email.primary)
    return sortedEmail
}

const authOptions: NextAuthOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string
        })
    ],
    jwt: {
        encode: ({ secret, token }) => {
            const encodedToken = jsonwebtoken.sign(
                {
                    ...token,
                    iss: process.env.ISSUER_URL,
                    exp: Math.floor(Date.now() / 1000) + 60 * 60
                },
                secret
            )
            return encodedToken
        },
        decode: async ({ secret, token }) => {
            const decodedToken = jsonwebtoken.verify(token!, secret) as JWT
            return decodedToken
        }
    },
    callbacks: {
        session: async ({ session }) => {
            const email = session?.user?.email as string
            try {
                const data = await getUser(email) as {
                    user?: UserProfile
                }
                const newSession = {
                    ...session,
                    user: {
                        name: session.user?.name,
                        email: session.user?.email,
                        ...data?.user,
                    }
                }
                return newSession
            } catch (error) {
                console.log("ERROR RETRIEVING USER DATA", error)
                return session
            }
        },
        signIn: async ({ account, user }) => {
            try {
                // fetch email from github
                const sortedEmail = await fetchDiscordEmail(
                    account?.access_token as string
                )
                if (!sortedEmail)
                    return false

                user.email = sortedEmail?.email
                const userExists = await getUser(sortedEmail?.email as string) as {
                    user?: UserProfile
                }

                if (!userExists.user) {
                    await createUser(
                        user.name as string,
                        user.email as string,
                        user.image as string
                    )
                }

                return true
            } catch (error) {
                console.log(error)
                return false
            }
        }
    }
}

export const getCurrentUser = async () => {
    const session = await getServerSession(authOptions) as SessionInterface
    return session
}

export default authOptions