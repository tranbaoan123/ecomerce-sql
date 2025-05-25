import axios from 'axios'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import zxcvbn from 'zxcvbn'
const registerSchema = z.object({
    email: z.string().email({ message: 'Invalid Email' }),
    password: z.string().min(3, { message: 'Password must be at least 3 characters' }),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, { message: 'Password is not match', path: ["confirmPassword"] })
const Register = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(registerSchema)
    })

    const handleOnSubmit = async (data) => {
        const passwordScore = zxcvbn(data.password).score
        if (passwordScore < 1) {
            toast.warning('Password Is Too Weak.Please Considerate A Strong Password')
            return;
        }
        if (data.password !== data.confirmPassword) toast.error('Password Does Not Matched')
        try {
            const { email, password } = data
            const response = await axios.post('http://localhost:8080/api/auth/register', { email, password })
            if (response?.data.success) {
                toast.success(response?.data.message)
                reset()
            }

        } catch (error) {
            const errMsg = error.response?.data?.message
            toast.error(errMsg)
        }

    }
    return (
        <div className='bg-gray-100 h-screen flex flex-col justify-center'>
            <form className='max-w-[50%] mx-auto bg-white shadow-md p-4 rounded-md w-full' onSubmit={handleSubmit(handleOnSubmit)}>
                <h2 className='text-center text-3xl font-semibold'>Register</h2>
                <div className="mb-6">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input type="email" id="email" name="email"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="user@gmail.com" {...register('email')} />
                </div>
                {errors.email && <span className='text-red-500'>{errors.email.message}</span>}
                <div className="mb-6">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                    <input type="password" id="password" name="password"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        {...register('password')}
                    />
                </div>

                {errors.password && <span className='text-red-500'>{errors.password.message}</span>}
                <div className="mb-6">
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                    <input type="password" id="confirmPassword" name="confirmPassword"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        {...register('confirmPassword')}
                    />
                </div>

                {errors.confirmPassword && <span className='text-red-500'>{errors.confirmPassword.message}</span>}
                <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium">
                    Register
                </button>

                <div className="text-center mt-6">
                    <p className="text-sm text-gray-600">
                        Already have an account? <Link to={'/login'} className="text-blue-600 hover:underline font-medium">Log In</Link>
                    </p>
                </div>
            </form>
        </div>
    )
}

export default Register