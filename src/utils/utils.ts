import { imageBaseUrl } from "./constants"

const maxTextLength = 200

export const getImageUrl = (width: string, endpoint: string | null) => {
    return `${imageBaseUrl}${width}${endpoint}`
}
export const trunc = (text: string) => {
    return text.length <= maxTextLength
        ? text
        : text.slice(0, maxTextLength - 3) + "..."
}
export const makeStar = (rating: number, starType: string[]): string[] => {
    if (rating <= 0) return starType
    if (rating - 1 >= 0) return makeStar(rating - 1, [...starType, "full"])
    return makeStar(rating - 1, [...starType, "half"])
}
