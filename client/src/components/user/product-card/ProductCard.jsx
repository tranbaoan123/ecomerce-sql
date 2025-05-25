import { ShoppingCart } from 'lucide-react';
import { formatVietnameseCurrency } from '../../../utils/helper';
import useEcomStore from '../../../store/store';
const ProductCard = ({ product }) => {
    const addToCart = useEcomStore((state) => state.addToCart)
    return (
        <div className='border rounded-md shadow-md p-2 w-52'>
            <div>
                <div className='w-full h-44 bg-gray-200 rounded-md flex justify-center items-center text-center'>
                    <img src={product?.images[0]?.url || ""} alt="product image" className='w-full h-full object-cover' />
                </div>
            </div>
            <div className='py-2'>
                <h3 className='text-xl'>{product?.title}</h3>
                <div className='mt-5'>
                    <p className='text-sm text-gray-500'>{product?.description}</p>
                    <p>{product?.category?.name}</p>
                </div>

            </div>
            <div className='flex justify-between items-center'>
                <span className='text-sm font-bold'>{formatVietnameseCurrency(product?.price)}</span>
                <button onClick={() => addToCart(product)} className='bg-green-400 hover:bg-green-600 p-1 rounded-md'><ShoppingCart color='#fff' /></button>
            </div>
        </div>
    )
}

export default ProductCard