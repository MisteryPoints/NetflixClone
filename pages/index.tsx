import Billboard from '@/components/Billboard'
import MovieList from '@/components/MovieList'
import Navbar from '@/components/Navbar' 
import InfoModal from '@/components/infoModal'
import useFavorites from '@/hooks/useFavorites'
import useInfoModal from '@/hooks/useInfoModal'
import useMovieList from '@/hooks/useMovieList'
import { NextPageContext } from 'next'
import { getSession } from 'next-auth/react' 
import Head from 'next/head'

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
 
 export default function Home() {
   const { data: movies = [] } = useMovieList()
   const { data: favorites = [] } = useFavorites()
   const { isOpen, closeModal } = useInfoModal()

   return (
      <>   
         <Head>
            <title>DevPoint Netflix</title>
         </Head>
         <InfoModal visible={isOpen} onClose={closeModal} />
         <Navbar/>
         <Billboard/>
         <div className='pb-40'>
            <MovieList data={movies} title={'Trending Now'} />
            <MovieList data={favorites} title={'My List'} />
         </div> 
      </>
   )
}
