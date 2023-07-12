import Image from "next/image"

import { getCurrentUser } from "@/lib/auth"
import AuthSession from "./AuthSession"
import NavUser from "./NavUser"

const Navbar = async () => {
    const session = await getCurrentUser()

    return (
        <nav className="flex w-full mb-16 pt-3 px-4 justify-between items-center">
            <a className="flex items-center gap-2" href="/">
                <Image
                    src="/caramel.png"
                    width={40}
                    height={40}
                    alt="Logo"
                />
                <p className="hidden sm:block text-xl font-medium">PromptShare</p>
            </a>
            {!session
                ? (<AuthSession />)
                : (<NavUser user={session.user} />)
            }
        </nav>
    )
}

export default Navbar