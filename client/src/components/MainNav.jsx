import { Link, NavLink, useNavigate } from 'react-router-dom'
import useEcomStore from '../store/store'
import userAvatar from '../assets/user_avatar.svg'
import { ChevronDown, Search } from 'lucide-react'
import { useState } from 'react'
const MainNav = () => {
    const [isOpen, setIsOpen] = useState(false)
    const navigate = useNavigate()
    const carts = useEcomStore((state) => state.carts)
    const user = useEcomStore((state) => state.user)
    const actionLogout = useEcomStore((state) => state.actionLogout)
    const handleLogout = () => {
        actionLogout()
        navigate('/')
    }
    const toggleDropdown = () => {
        setIsOpen(!isOpen)
    }
    return (
        <nav className='bg-green-400'>
            <div className='px-4'>
                <div className='flex justify-between h-16'>
                    <div className='flex gap-4 items-center'>
                        <Link to={'/'} className='text-2xl font-bold'>LOGO</Link>
                        <NavLink to={'/'} className={({ isActive }) => isActive ? 'underline font-bold' : ''}>Home</NavLink>
                        <NavLink to={'/shop'} className={({ isActive }) => isActive ? 'underline font-bold' : ''}>Shop</NavLink>
                        <NavLink to={'/cart'} className={({ isActive }) => isActive ? 'underline font-bold' : ''}>
                            <div className='relative'>
                                <span>Cart</span>
                                <span className='absolute -top-2 bg-red-500 text-white  w-6 h-6 rounded-full text-center'>{carts.length}</span>
                            </div>
                        </NavLink>
                    </div>
                    <div className='flex items-center w-[420px]'>
                        <div className='w-full'>
                            <form className='flex items-center relative'>
                                <input type="text" placeholder='Search Product' className='py-2 px-4 w-full rounded-full' />
                                <button type='submit' className='absolute right-2'>
                                    <Search className='text-gray-500' />
                                </button>
                            </form>
                        </div>
                    </div>
                    {user ? <div className='flex gap-4 items-center'>
                        <button onClick={toggleDropdown} className='flex items-center gap-2'>
                            <img src={userAvatar} alt="" className='w-10 h-10' />
                            <ChevronDown />
                        </button>
                        {
                            isOpen && <div className='absolute top-16 bg-white p-2 z-50'>
                                <Link to={'/user/history'} className='block p-2 hover:bg-gray-200'>History</Link>
                                <Link onClick={handleLogout} className='block p-2 hover:bg-gray-200'>Logout</Link>
                            </div>
                        }

                    </div> : <div className='flex gap-4 items-center'>
                        <>
                            <NavLink to={'register'} className={({ isActive }) => isActive ? 'underline font-bold' : ''}>Register</NavLink>
                            <NavLink to={'login'} className={({ isActive }) => isActive ? 'underline font-bold' : ''}>Login</NavLink>
                        </>
                    </div>}



                    {/* <div className='flex gap-4 items-center'>
                        {
                            !token ? <>
                                <NavLink to={'register'} className={({ isActive }) => isActive ? 'underline font-bold' : ''}>Register</NavLink>
                                <NavLink to={'login'} className={({ isActive }) => isActive ? 'underline font-bold' : ''}>Login</NavLink>
                            </> : <button onClick={handleLogout}>Logout</button>
                        }

                    </div> */}
                </div>
            </div>
        </nav>
    )
}

export default MainNav