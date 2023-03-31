import { Carousel } from "@/components/Carousel"
import { fetcher } from "@/utils/fetcher"
import { getImageUrl } from "@/utils/utils"
import { nanoid } from "nanoid"
import { GetServerSidePropsContext } from "next"
import Image from "next/image"
import { useState } from "react"
import { BsPlayCircleFill } from "react-icons/bs"

interface Image {
    aspect_ratio: number
    height: number
    iso_639_1: string
    file_path: string
    vote_average: number
    width: number
}

interface Video {
    iso_639_1: string
    key: string
    site: string
    type: string
}

interface Cast {
    id: number
    character: string
    name: string
    popularity: number
    profile_path: string
}

interface Data {
    backdrop_path: string
    poster_path: string
    genres: [
        {
            id: number
            name: string
        }
    ]
    images: {
        backdrops: Image[]
        posters: Image[]
    }
    overview: string
    status: string
    name: string
    videos: {
        results: Video[]
    }
    tagline: string
    credits: {
        cast: Cast[]
    }
}

export const getServerSideProps = async (
    context: GetServerSidePropsContext
) => {
    const data = await fetcher(
        `/tv/${context.params?.id}`,
        "&language=vi&append_to_response=videos,images,credits&include_video_language=vi,null&include_image_language=vi,null"
    )
    return {
        props: {
            data
        }
    }
}

const MovieDetails = ({ data }: { data: Data }) => {
    const [playVideo, setPlayVideo] = useState(false)
    const trailer =
        data.videos.results.find(
            (video) => video.type === "Trailer" && video.iso_639_1 === "vi"
        ) ||
        data.videos.results.find(
            (video) => video.type === "Trailer" && video.iso_639_1 === "en"
        )
    const onPlay = () => {
        setPlayVideo(true)
    }
    return (
        <div>
            <div>
                <div className="relative">
                    <div className="relative">
                        <Image
                            src={getImageUrl("/w1280", data.backdrop_path)}
                            width={1280}
                            height={780}
                            alt="movie cover"
                            className="lg:h-[60vh] w-full object-center object-cover"
                        />
                        <div className="absolute left-0 top-0 w-full h-full bg-gradient-to-t from-[rgba(0,0,0,1)]" />
                    </div>
                    <Image
                        src={getImageUrl("/w500", data.poster_path)}
                        width={780}
                        height={780 * 1.5}
                        alt="movie poster"
                        className="absolute rounded-md bottom-0 left-1/2 lg:left-20 -translate-x-1/2 lg:translate-x-0 h-3/4 w-auto shadow-[rgba(255,255,255,0.2)] shadow-lg"
                    />
                    <div className="h-[100px]"></div>
                </div>
                <div className="w-full text-center md:px-14 lg:text-left mt-3">
                    <h1 className="px-5 text-3xl font-bold">
                        {data.name}
                        <span className="block text-xl">{data.tagline}</span>
                    </h1>
                    <h2 className="mt-2 px-3">
                        {data.genres.map((genre) => (
                            <span
                                key={genre.id}
                                className="text-sm bg-[rgba(0,255,17,0.4)] mx-1 px-3 py-1 rounded-sm"
                            >
                                {genre.name}
                            </span>
                        ))}
                    </h2>
                    <button
                        className="text-5xl mt-3 rounded-full md:mx-4"
                        onClick={onPlay}
                    >
                        <BsPlayCircleFill />
                    </button>
                    {playVideo && (
                        <div
                            onClick={() => setPlayVideo(false)}
                            className="w-full md:pl-14 h-screen fixed top-0 left-0 bg-[rgba(0,0,0,0.9)] z-10"
                        >
                            <div className="w-full h-full relative">
                                <div className="w-[80%] md:w-[60%] aspect-video absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                                    <iframe
                                        width="560"
                                        height="315"
                                        src={`https://www.youtube.com/embed/${trailer?.key}?autoplay=1`}
                                        title="YouTube video player"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        allowFullScreen
                                        className="h-full w-full"
                                    ></iframe>
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="mt-3 px-5 text-left">
                        <h3 className="font-semibold text-xl">
                            Nội dung chính
                        </h3>
                        <p>{data.overview}</p>
                    </div>
                    <div className="px-5">
                        <h3 className="font-bold text-2xl mt-3">Diễn viên</h3>
                        <div className="mt-3 grid grid-cols-2 w-[70%] md:grid-cols-3 lg:grid-cols-6 mx-auto">
                            {data.credits.cast
                                .sort((a, b) =>
                                    a.popularity > b.popularity ? -1 : 1
                                )
                                .slice(0, 6)
                                .map((cast) => (
                                    <div
                                        key={cast.id}
                                        className="flex flex-col justify-start items-center mt-2"
                                    >
                                        <div className="overflow-hidden w-12 h-12 rounded-full">
                                            <Image
                                                src={getImageUrl(
                                                    "/w185",
                                                    cast.profile_path
                                                )}
                                                width={185}
                                                height={185 * 1.5}
                                                alt="cast profile image"
                                                className="w-12 h-12 object-cover object-center"
                                            />
                                        </div>
                                        <h3 className="flex flex-col mt-2 text-center">
                                            <span className="text-xs">
                                                {cast.name}
                                            </span>
                                            <span className="">
                                                {cast.character}
                                            </span>
                                        </h3>
                                    </div>
                                ))}
                        </div>
                        <div className="mt-4 mx-auto">
                            <h3 className="text-2xl font-bold mb-3">
                                Hình ảnh
                            </h3>
                            <Carousel>
                                {data.images.backdrops
                                    .sort((a, b) =>
                                        a.vote_average > b.vote_average ? -1 : 0
                                    )
                                    .map((image) => (
                                        <div
                                            className="basis-full lg:basis-1/3 flex-grow-0 flex-shrink-0 mr-2"
                                            key={nanoid()}
                                        >
                                            <Image
                                                src={getImageUrl(
                                                    "/w1280",
                                                    image.file_path
                                                )}
                                                width={1289}
                                                height={720}
                                                alt="movie image"
                                                className="w-full"
                                            />
                                        </div>
                                    ))}
                            </Carousel>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default MovieDetails
