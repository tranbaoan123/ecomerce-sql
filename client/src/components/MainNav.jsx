import React from 'react'
import { Link } from 'react-router-dom'

const MainNav = () => {
    return (
        <nav className='bg-green-400'>
            <div className='px-4'>
                <div className='flex justify-between h-16'>
                    <div className='flex gap-4 items-center'>
                        <Link to={'/'} className='text-2xl font-bold'>LOGO</Link>
                        <Link to={'/'}>Home</Link>
                        <Link to={'shop'}>Shop</Link>
                        <Link to={'cart'}>Cart</Link>
                    </div>
                    <div className='flex gap-4 items-center'>
                        <Link to={'register'}>Register</Link>
                        <Link to={'login'}>Login</Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default MainNav