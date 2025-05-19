import { Minus, Plus, Trash2 } from 'lucide-react';
import useEcomStore from '../../../store/store';
import { formatVietnameseCurrency } from '../../../utils/helper';
import { Link } from 'react-router-dom';
const Cart = () => {
    const carts = useEcomStore(state => state.carts)
    const updateQuantity = useEcomStore(state => state.updateQuantity)
    const removeProductFromCart = useEcomStore(state => state.removeProductFromCart)
    const getTotalPrice = useEcomStore((state) => state.getTotalPrice)

    return (
        <div>
            <h1 className='text-2xl font-bold'>Cart</h1>
            {carts.length > 0 ? <div className='border p-2'>
                {/* Card */}
                {carts.length > 0 && carts.map((item, index) => {
                    return <div key={index} className='bg-white p-2 rounded-md shadow-md border-b mb-2'>
                        {/* Row 1 */}
                        <div className='flex justify-between mb-4'>
                            {/* Left */}
                            <div className='flex gap-2'>
                                <img src={item?.images[0].url} alt="" className='w-16 h-16 bg-gray-200 rounded-md' />
                                <div>
                                    <p className='font-bold'>{item.title}</p>
                                    <p className='text-sm'>{item.description}</p>
                                </div>
                            </div>
                            {/* Right */}
                            <div className='p-2'>
                                <Trash2 onClick={() => removeProductFromCart(item.id)} className='text-red-600 cursor-pointer' />
                            </div>
                        </div>
                        {/* Row 2 */}
                        <div className='flex justify-between items-center'>
                            {/* Left */}
                            <div className='flex items-center border rounded-md px-2 py-1'>
                                <button onClick={() => updateQuantity(item.id, item.count - 1)} className='px-2 py-1 bg-gray-200'><Minus size={16} /></button>
                                <span className='px-4 font-bold'>{item.count}</span>
                                <button onClick={() => updateQuantity(item.id, item.count + 1)} className='px-2 py-1 bg-gray-200'><Plus size={16} /></button>
                            </div>
                            {/* Right */}
                            <p className='font-bold'>
                                {formatVietnameseCurrency(item.price * item.count)}
                            </p>
                        </div>
                    </div>
                })}

                {/* Total */}
                <div className='font-bold flex justify-between items-center px-2 '>
                    <span>Total</span>
                    <span>{formatVietnameseCurrency(getTotalPrice())}</span>
                </div>
                {/* Button */}
                <Link to={'/cart'} className='inline-block text-center mt-4 bg-green-500 hover:bg-green-700 text-white w-full py-2 rounded-md shadow-md'>Order</Link>
            </div> : <h2 className='text-xl font-semibold'>Your Cart Is Empty</h2>}
        </div>
    )
}

export default Cart