import { movieBaseUrl, apiKey } from "./constants"

export const fetcher = async (endpoint: string, query: string) => {
    try {
        const response = await fetch(
            `${movieBaseUrl}${endpoint}?api_key=${apiKey}${query}`
        )
        return response.json()
    } catch (error) {
        console.log(error)
    }
}
