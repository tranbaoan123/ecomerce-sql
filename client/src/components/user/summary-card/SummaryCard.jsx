import { useEffect, useState } from "react"
import useEcomStore from "../../../store/store"
import { listUserCart, saveOrder, saveUserAddress } from "../../../api/user"
import { toast } from 'react-toastify'
import { useNavigate } from "react-router-dom"
import { formatVietnameseCurrency } from "../../../utils/helper"
const SummaryCard = () => {
    const navigate = useNavigate()
    const token = useEcomStore((state) => state.token)
    const clearCart = useEcomStore((state) => state.clearCart)
    const [cartData, setCartData] = useState({
        cartTotal: 0,
        products: []
    })
    const [address, setAddress] = useState('')
    const [isAddressSave, setIsAddressSave] = useState(false)
    const handleGetUserCart = async (token) => {
        try {
            const res = await listUserCart(token)
            setCartData(res.data.data)
        } catch (error) {
            console.log(error);

        }
    }
    useEffect(() => {
        handleGetUserCart(token)
    }, [])
    const handleSaveAddress = async () => {
        if (!address) {
            toast.error('Please fill in your address')
            return
        }
        try {
            const res = await saveUserAddress(token, address);
            toast.success(res.data.message)
            setAddress('')
            setIsAddressSave(true)
        } catch (error) {
            console.log(error);
        }

    }
    const handleSaveOrder = async () => {
        if (!isAddressSave) {
            return toast.error('Please fill in your address')
        }
        try {
            const res = await saveOrder(token)
            toast.success(res.data.message)
            clearCart()
            navigate('/')

        } catch (error) {
            console.log(error);
        }

        // navigate('/user/payment')
    }
    return (
        <div className="mx-auto">
            <div className="flex justify-center flex-wrap gap-4 ">
                {/* Left */}
                <div className="w-[30%]">
                    <div className="bg-gray-100 p-4 rounded-md border shadow-md space-y-4">
                        <h1 className="text-lg font-bold">Deliver Address</h1>
                        <textarea onChange={(e) => setAddress(e.target.value)} className="w-full px-2 rounded-md" value={address}></textarea>
                        <button onClick={handleSaveAddress} className="bg-green-500 hover:bg-green-600 text-white py-1 px-2 rounded-md">Save Address</button>
                    </div>
                </div>
                {/* Right */}
                <div className="w-[60%]">
                    <div className="bg-gray-100 p-4 rounded-md border shadow-md space-y-4">
                        <h1 className="text-lg font-bold">Summary</h1>
                        {/* Item List */}
                        {cartData.products?.length > 0 && cartData.products.map((item) => {
                            return <div key={item.id}>
                                <div className="flex justify-between items-end">
                                    <div>
                                        <p>Title: {item.product.title}</p>
                                        <p>Price: {item.count} X {formatVietnameseCurrency(item.price)}</p>
                                    </div>
                                    <div>
                                        <p className="text-red-500 font-bold">{formatVietnameseCurrency(item.count * item.price)}</p>
                                    </div>
                                </div>
                            </div>
                        })}
                        <div>
                            <div className="flex justify-between">
                                <p>Shipping Fee:</p>
                                <p>0.00</p>
                            </div>
                            <div className="flex justify-between">
                                <p>Discount:</p>
                                <p>0.00</p>
                            </div>
                        </div>
                        <hr />
                        <div>
                            <div className="flex justify-between">
                                <p className="font-bold">Total:</p>
                                <p className="text-red-500 font-bold text-lg">{formatVietnameseCurrency(cartData.cartTotal)}</p>
                            </div>
                        </div>
                        <hr />
                        <div>
                            <button onClick={handleSaveOrder} className="bg-green-500 hover:bg-green-600 w-full text-white p-2 rounded-md">Order</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SummaryCard