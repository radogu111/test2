import useEmblaCarousel from "embla-carousel-react"
import { FC, PropsWithChildren } from "react"

export const Carousel: FC<PropsWithChildren> = ({ children }) => {
    const [emblaRef] = useEmblaCarousel({ align: "start" })
    return (
        <div
            ref={emblaRef}
            className="overflow-hidden"
        >
            <div className="flex">{children}</div>
        </div>
    )
}
