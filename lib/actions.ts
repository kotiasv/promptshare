import {
    createPromptMutation,
    createUserMutation,
    deleteUserMutation,
    getPromptQuery,
    getPromptsQuery,
    getUserQuery
} from "@/graphql"
import { PromptForm } from "@/types"
import { GraphQLClient } from "graphql-request"
import axios from "axios"

// production / dev
const isProduction = process.env.NODE_ENV === "production"
const apiUrl = isProduction
    ? process.env.NEXT_PUBLIC_GRAFBASE_API_URL || ""
    : "http://127.0.0.1:4000/graphql"
const apiKey = isProduction
    ? process.env.NEXT_PUBLIC_GRAFBASE_API_KEY || ""
    : "DEVAPIKEY"
const serverUrl = isProduction
    ? process.env.NEXT_PUBLIC_SERVER_URL
    : "http://localhost:3000"

const client = new GraphQLClient(apiUrl)

const graphQLRequest = async (query: string, variables = {}) => {
    try {
        return await client.request(query, variables)
    } catch (error) {
        throw error
    }
}
export const fetchToken = async () => {
    try {
        const response = await axios.get(`${serverUrl}/api/auth/token`)
        return response.data
    } catch (error) {
        throw error
    }
}


export const getUser = (email: string) => {
    client.setHeader("x-api-key", apiKey)
    return graphQLRequest(getUserQuery, {
        email
    })
}

export const createUser = (
    name: string,
    email: string,
    imageUrl: string
) => {
    client.setHeader("x-api-key", apiKey)
    return graphQLRequest(createUserMutation, {
        input: {
            name, email, imageUrl
        }
    })
}

export const getPrompts = () => {
    client.setHeader("x-api-key", apiKey)
    return graphQLRequest(getPromptsQuery)
}

export const getPromptsById = async (id: string) => {
    client.setHeader("x-api-key", apiKey)
    const variables = {
        id
    }
    return await graphQLRequest(getPromptQuery, variables) as {
        prompt: {
            title: string
            description: string
            createdBy: {
                name: string
                imageUrl: string
            }
        }
    }
}

export const createPrompt = (form: PromptForm, creatorId: string, token: string) => {
    client.setHeader("x-api-key", apiKey)
    client.setHeader("Authorization", `Bearer ${token}`)
    const variables = {
        input: {
            ...form,
            createdBy: {
                link: creatorId
            }
        }
    }
    return graphQLRequest(createPromptMutation, variables)
}

// dev only!
export const deleteUser = (id: string) => {
    client.setHeader("x-api-key", apiKey)
    return graphQLRequest(deleteUserMutation, {
        id
    })
}