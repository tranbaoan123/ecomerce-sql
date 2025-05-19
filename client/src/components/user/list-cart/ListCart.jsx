import { ListCheck, Trash2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { addUserCart } from '../../../api/user'
import useEcomStore from '../../../store/store'
import { formatVietnameseCurrency } from '../../../utils/helper'
import { toast } from 'react-toastify'
const ListCart = () => {
    const carts = useEcomStore((state) => state.carts)
    const token = useEcomStore((state) => state.token)
    const getTotalPrice = useEcomStore((state) => state.getTotalPrice)
    const navigate = useNavigate()
    const handleAddToCArt = async (cart) => {
        try {
            const res = await addUserCart(token, { cart })
            toast.success(res.data.message)
            navigate('/checkout')
        } catch (error) {
            console.log(error);

        }
    }
    return (
        <div className='bg-gray-100 rounded-sm p-4'>
            {/* Header */}
            <div className='flex'>
                <ListCheck size={36} />
                <p className='text-2xl font-bold'>Product In Cart: {carts?.length} product</p>
            </div>
            {/* List */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                {carts.length > 0 && carts.map((item, index) => {
                    return <div key={index} className='bg-white p-2 rounded-md shadow-md border-b mb-2 col-span-2 row-span-1'>
                        {/* Row 1 */}
                        <div className='flex justify-between mb-4'>
                            {/* Left */}
                            <div className='flex gap-4'>
                                <img src={item?.images[0].url} alt="" className='w-16 h-16 bg-gray-200 rounded-md' />
                                <div>
                                    <p className='font-bold'>{item.title}</p>
                                    <p className='text-sm'>{item.description}</p>
                                    <p>{item.price} X {item.count}</p>
                                </div>
                            </div>
                            {/* Right */}
                            <div className='p-2'>
                                <Trash2 onClick={() => removeProductFromCart(item.id)} className='text-red-600 cursor-pointer' />
                                <p className='font-bold'>{formatVietnameseCurrency(item.price * item.count)}</p>
                            </div>
                        </div>
                    </div>
                })}
                {/* Total */}
                <div className='bg-white p-2 rounded-md shadow-md space-y-4'>
                    <p className='font-bold text-2xl'>Total</p>
                    <div className='flex justify-between'>
                        <span>Final Price</span>
                        <span className='text-2xl'>{formatVietnameseCurrency(getTotalPrice())}</span>
                    </div>
                    <button onClick={() => handleAddToCArt(carts)} className='bg-red-500 hover:bg-red-700 w-full rounded-md text-white font-bold py-2 shadow-md'>Checkout</button>
                    <Link to={'/shop'} className='inline-block text-center bg-gray-500 hover:bg-gray-700 w-full rounded-md text-white font-bold py-2 shadow-md'>Go Back To Shop</Link>
                </div>
            </div>

        </div>
    )
}

export default ListCart