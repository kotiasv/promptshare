# With ♥ by Kotiasv

Share & View ChatGPT prompts with PromptShare.
<p align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=git,ts,nodejs,react,tailwind,graphql,nextjs,vercel&theme=dark" />
  </a>
  <p>Aaaand Grafbase (no icon yet)</p>
</p>

## Getting started

To get started you need to run developer servers

```bash
# BASH #1
npm run dev
# or
yarn dev
# or
pnpm dev
```
```bash
# BASH #2
npx grafbase@0.24 dev
```
To run github auth locally you need to create your own Github App. (`Settings/Developer settings`)

## Environment variables

For github auth:
- `GITHUB_ID`
- `GITHUB_SECRET`

For grafbase:
- `NEXT_PUBLIC_GRAFBASE_API_URL`
- `NEXT_PUBLIC_GRAFBASE_API_KEY`

For JWT:
- `NEXTAUTH_SECRET`

For NextAuth:
- `NEXTAUTH_URL`

## Project Structure

For Auth I used NextAuth. Auth Options inside `lib/auth.ts` ; jwt, session and signIn callbacks are rewrote there.

All grafbase interactions inside `lib/actions.ts`. GraphQL queries placed in `graphql`. 

Some interactions require token. (`api/auth/token/route.ts`)

Grafbase config and modals store in `grafbase/grafbase.config.ts`. Provider set as JWT

Main types in `types/index.ts`.

For getting grafbase data I suggest to use SSR.

Other files that left is pages and components.

## Contributions

This project is Open Source. Your feedback and contributions are welcome here.

## Thanks

[Adrian Hajdin](https://github.com/adrianhajdin) for his [Web App](https://promptopia.vercel.app/). Took idea and some stylings as well.

