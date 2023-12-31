import useCurrentUser from '@/hooks/useCurrentUser'
import { NextPageContext } from 'next'
import { getSession, signOut } from 'next-auth/react'
import Image from 'next/image'
import Head from 'next/head'
import { useRouter } from 'next/router'

 export async function getServerSideProps(context: NextPageContext){
   const session = await getSession(context)

   if(!session){
      return {
         redirect: {
            destination: '/auth',
            permanent: false
         }
      }
   }

   return {
      props: {}
   }
 } 
 
 const Profiles = () => {
    const router = useRouter()
    const { data: user } = useCurrentUser()

    return (
        <div className='flex items-center h-full justify-center'>
            
            <Head>
                <title>DevPoint Netflix | Profiles</title>
            </Head>
            <div className='flex flex-col'>
                <h1 className='text-3xl md:text-6xl text-gray-100 text-center'>Who is watching?</h1>
                <div className='flex items-center justfy-center gap-8 mt-10 w-full'>
                    <div onClick={() => router.push('/')} >
                        <div className='group flex-row w-44 mx-auto'>
                            <div className='w-44 h-44 rounded-md flex items-center justify-center border-2 border-transparent group-hover:cursor-pointer group-hover:border-white overflow-hidden'>
                                <Image src='/images/profile.png' alt='Profile' width={320} height={320} />
                            </div>
                            <div className='mt-4 text-gray-400 text-2xl text-center group-hover:text-white group-hover:cursor-pointer'>
                                { user?.name }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profiles