"use client"

import { signIn } from "next-auth/react"

const NavbarSession = () => {
    return (
        <div onClick={() => signIn()}>Log in</div>
    )
}

export default NavbarSession