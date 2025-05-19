import { Ban } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'

const LoadingToRedirect = ({ errMessage }) => {
    const [count, setCount] = useState(6)
    const [redirect, setRedirect] = useState(false)

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((currentCount) => {
                if (currentCount === 1) {
                    clearInterval(interval)
                    setRedirect(true)
                }
                return currentCount - 1
            })

        }, 1000)

        return () => clearInterval(interval)
    }, [])

    if (redirect) {
        return <Navigate to={'/'} />
    }

    return (
        <div className='w-full h-screen flex flex-col justify-center items-center'>
            <Ban size={64} className='text-red-500' />
            <p className='font-bold text-2xl'>Error: {errMessage}.You don't have the necessary permissions to view this page., Redirect in {count}</p>
        </div>
    )
}

export default LoadingToRedirect