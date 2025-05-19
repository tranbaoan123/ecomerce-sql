import { Link, useNavigate } from 'react-router-dom'
import useEcomStore from '../store/store'
const MainNav = () => {
    const navigate = useNavigate()
    const carts = useEcomStore((state) => state.carts)
    const token = useEcomStore((state) => state.token)
    const actionLogout = useEcomStore((state) => state.actionLogout)
    const handleLogout = () => {
        actionLogout()
        navigate('/')
    }
    return (
        <nav className='bg-green-400'>
            <div className='px-4'>
                <div className='flex justify-between h-16'>
                    <div className='flex gap-4 items-center'>
                        <Link to={'/'} className='text-2xl font-bold'>LOGO</Link>
                        <Link to={'/'}>Home</Link>
                        <Link to={'/shop'}>Shop</Link>
                        <Link to={'/cart'}>
                            <div className='relative'>
                                <span>Cart</span>
                                <span className='absolute -top-2 bg-red-500 text-white  w-6 h-6 rounded-full text-center'>{carts.length}</span>
                            </div>
                        </Link>
                    </div>
                    <div className='flex gap-4 items-center'>
                        {
                            !token ? <>
                                <Link to={'register'}>Register</Link>
                                <Link to={'login'}>Login</Link>
                            </> : <button onClick={handleLogout}>Logout</button>
                        }

                    </div>
                </div>
            </div>
        </nav>
    )
}

export default MainNav