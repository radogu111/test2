import Link from "next/link"
import { FC, PropsWithChildren } from "react"

interface Props {
    href: string
    className: string
}

export const LinkButton: FC<PropsWithChildren<Props>> = ({
    children,
    href,
    className
}) => {
    return (
        <Link
            href={href}
            className={className}
        >
            <button type="button">{children}</button>
        </Link>
    )
}
