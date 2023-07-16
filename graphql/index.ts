export const getUserQuery = `
    query GetUser($email: String!) {
        user(by: { email: $email }) {
            id
            name
            email
            imageUrl
            prompts(first: 100) {
                edges {
                    node {
                        title
                        description
                        id
                    }
                }
            }
        }
    }
`

export const getPromptsQuery = `
    query GetPrompts {
        promptCollection(first: 100) {
            edges {
                node {
                    title
                    description
                    createdBy {
                        name
                        imageUrl
                    }
                    id
                }
            }
        }
    }
`

export const getPromptQuery = `
    query GetPrompt($id: ID!) {
        prompt(by: { id: $id }) {
            title
            description
            createdBy {
              name
              imageUrl
            }
          }
    }
`

export const createUserMutation = `
    mutation CreateUser($input: UserCreateInput!) {
        userCreate(input: $input) {
            user {
                name
                email
                imageUrl
                id
            }
        }
    }
`

export const createPromptMutation = `
    mutation PromptCreate($input: PromptCreateInput!) {
        promptCreate(input: $input) {
            prompt {
                title
                description
                createdBy {
                    name
                    email
                }
                id
            }
        }
    }
`

// dev only!
export const deleteUserMutation = `
    mutation DeleteUser($id: ID!) {
        userDelete(by: { id: $id }) {
            deletedId
        }
    }
`

export const deletePromptMutation = `
    mutation DeketePrompt($id: ID!) {
        promptDelete(by: { id: $id }) {
            deletedId
        }
    }
`