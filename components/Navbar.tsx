import Image from 'next/image'
import NavbarItem from './NavbarItem'
import MobileMenu from './MobileMenu'
import { BsChevronDown, BsSearch, BsBell } from 'react-icons/bs'
import { useCallback, useEffect, useState } from 'react'
import AccountMenu from './AccountMenu'

const TOP_OFFSET = 66

const Navbar = () => {
    const [showMobileMenu, setShowMobileMenu] = useState(false)
    const [showAccountMenu, setShowAccountMenu] = useState(false)
    const [showBackground, setShowBackground] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY >= TOP_OFFSET) {
                setShowBackground(true)
            } else {
                setShowBackground(false)
            }
        }

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    } ,[])

    const toggleMobileMenu = useCallback(() => {
        setShowMobileMenu((current) => !current)
    }, [])

    const toggleAccountMenu = useCallback(() => {
        setShowAccountMenu((current) => !current)
    }, [])

    return(
        <nav className="w-full fixed z-40">
            <div className={`px-4 md:px-16 py-6 flex flex-row items-center transition duration-500 ${showAccountMenu ? 'bg-zing-900 opacity-90' : ''}`}>
                <Image width={178} height={48} alt='logo' className='max-h-4 lg:max-h-7 max-w-[60px] lg:max-w-[104px]' src='/images/logo.png'/>
                <div className='flex-row ml-8 gap-7 hidden lg:flex'>
                    <NavbarItem label='Home'/>
                    <NavbarItem label='Series'/>
                    <NavbarItem label='Films'/>
                    <NavbarItem label='New & Popular'/>
                    <NavbarItem label='My list'/>
                    <NavbarItem label='Browse by Languages'/>
                </div>
                <div onClick={toggleMobileMenu} className='lg:hidden flex flex-row items-center gap-3 ml-8 cursor-pointer relative'>
                    <p className='text-white text-sm'>Browse</p>
                    <BsChevronDown className={`text-white transition duration-200 ${showMobileMenu ? '-rotate-180' : 'rotate-0'}`}/>
                    <MobileMenu visible={showMobileMenu} />
                </div>
                <div className='flex flex-row ml-auto gap-7 items-center'>
                    <div className='text-gray-200 hover:text-gray-300 cursor-pointer transition'> 
                        <BsSearch/>
                    </div>                       
                    <div className='text-gray-200 hover:text-gray-300 cursor-pointer transition'> 
                        <BsBell/>
                    </div>  

                    <div className='flex flex-row items-center gap-2 cursor-pointer relative' onClick={toggleAccountMenu}>
                        <div className='w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden'>
                            <Image src='/images/profile.png' alt='My Profile' width={60} height={60}/>
                        </div>
                        <BsChevronDown className={`text-white transition duration-200 ${showAccountMenu ? 'rotate-180' : 'rotate-0'}`}/>
                        <AccountMenu visible={showAccountMenu} />
                    </div>                     
                </div>
            </div>
        </nav>
    )
}

export default Navbar