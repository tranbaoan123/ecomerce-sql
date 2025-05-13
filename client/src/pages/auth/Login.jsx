import axios from 'axios'
import React, { useState } from 'react'
import { data, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import useEcomStore from '../../store/store'
import { useNavigate } from 'react-router-dom'
const Login = () => {
    const navigate = useNavigate()
    const [formValues, setFormValues] = useState({
        email: "",
        password: "",
    })
    const actionLogin = useEcomStore((state) => state.actionLogin)
    const user = useEcomStore((state) => state.user)
    const handleOnChange = (e) => {
        const keyName = e.target.name;
        const value = e.target.value;
        setFormValues((prev) => {
            return {
                ...prev,
                [keyName]: value
            }
        })

    }
    const handleOnSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await actionLogin(formValues)
            const role = res.data.payload.role
            roleNavigate(role)
            toast.success('Welcome Back !')
            setFormValues({
                email: "",
                password: "",
            })
        } catch (error) {
            const errMsg = error.response?.data?.message
            toast.error(errMsg)
        }

    }
    const roleNavigate = (role) => {
        role === 'admin' ? navigate('/admin') : navigate('/user')
    }
    return (
        <div className='bg-gray-100 h-screen flex flex-col justify-center'>
            <form className='max-w-[50%] mx-auto bg-white shadow-md p-4 rounded-md w-full' onSubmit={handleOnSubmit}>
                <h2 className='text-center text-3xl font-semibold'>Login</h2>
                <div className="mb-6">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input type="email" id="email" name="email" required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="user@gmail.com" value={formValues.email} onChange={handleOnChange} />
                </div>


                <div className="mb-6">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                    <input type="password" id="password" name="password" required minLength="3"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        value={formValues.password}
                        onChange={handleOnChange}
                    />
                </div>

                <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium">
                    Login
                </button>

                <div className="text-center mt-6">
                    <p className="text-sm text-gray-600">
                        Haven't got an account yet? <Link to={'login'} className="text-blue-600 hover:underline font-medium">Register</Link>
                    </p>
                </div>
            </form>
        </div>
    )
}

export default Login