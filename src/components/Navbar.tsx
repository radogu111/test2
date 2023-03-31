import { RiHome2Line, RiMovie2Line, RiTv2Line } from "react-icons/ri"
import { LinkButton } from "./LinkButton"

export const Navbar = () => {
    const className =
        "text-3xl w-10 h-10 flex items-center justify-center hover:bg-[rgba(255,255,255,0.4)] hover:backdrop-blur-lg rounded-xl"
    return (
        <nav className="h-14 md:h-screen md:w-14 z-50 sticky md:fixed top-0 left-0 flex md:flex-col items-center justify-center gap-2 text-3xl bg-[rgba(0,0,0,0.1)] backdrop-blur-lg">
            <LinkButton
                href="/"
                className={className}
            >
                <RiHome2Line />
            </LinkButton>
            <LinkButton
                href="/movie"
                className={className}
            >
                <RiMovie2Line />
            </LinkButton>
            <LinkButton
                href="/tv"
                className={className}
            >
                <RiTv2Line />
            </LinkButton>
        </nav>
    )
}
