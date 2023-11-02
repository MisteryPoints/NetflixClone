import React from 'react'
import { useRouter } from 'next/router'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import Head from 'next/head'

import useMovie from '@/hooks/useMovie'

const Watch = () => {
    const router = useRouter()
    const { movieId } = router.query

    const { data } = useMovie(movieId as string)

    return (
        <div className='h-screen w-screen bg-black'> 
            <Head>
                <title>DevPoint Netflix | {data?.title}</title>
            </Head>
            <nav className='fixed w-full p-4 z-10 flex flex-row items-center gap-8 bg-black bg-opacity-70'>
                <AiOutlineArrowLeft className="text-white cursor-pointer" size={35} onClick={() => router.push('/')} />
                <p className='text-white text-xl md:text-3xl font-bold select-none'>
                    <span className='font-light'>Watching: {"  "}</span>
                    {data?.title}
                </p>
            </nav>
            <video autoPlay controls src={data?.videoUrl} className='h-full w-full'></video>
        </div>
    )
}

export default Watch