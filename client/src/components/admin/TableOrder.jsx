import { useEffect, useState } from "react"
import useEcomStore from "../../store/store"
import { changeOrderStatus, getOrdersAdmin } from "../../api/admin"
import { toast } from 'react-toastify'
import moment from 'moment'
import { formatVietnameseCurrency } from "../../utils/helper"
const TableOrder = () => {
    const token = useEcomStore((state) => state.token)
    const [orders, setOrders] = useState([])


    useEffect(() => {
        const fetchOrdersAdmin = async () => {
            try {
                const res = await getOrdersAdmin(token)
                setOrders(res.data.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchOrdersAdmin()
    }, [])

    const handleChangeOrderStatus = async (token, orderId, orderStatus) => {
        try {
            const res = await changeOrderStatus(token, orderId, orderStatus)
            toast.success(res.data.message)
        } catch (error) {
            console.log(error)

        }

    }
    return (
        <div className='container mx-auto bg-white p-4 shadow-md'>
            <table className="w-full">
                <thead>
                    <tr className="bg-gray-50">
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Order</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">User Info</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Product</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Total</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Manage</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.length > 0 && orders.map((order, index) => {
                        return <tr key={index} className="border-b">
                            <td>{index + 1}</td>
                            <td>
                                <p>{order.orderedBy.email}</p>
                                <p>{order.orderedBy.address}</p>
                            </td>
                            <td>{moment(order.createdAt).format('DD/MM/YYYY')}</td>
                            <td>

                                {order.products?.map((product, index) => {
                                    return <div key={index} className="flex gap-4 items-center">
                                        <p>{product.product.title}</p>
                                        <span className="text-sm font-bold">{product.count} X {product.price}</span>
                                    </div>
                                })}


                            </td>
                            <td>{formatVietnameseCurrency(order.cartTotal)}</td>
                            <td>
                                <select value={order.orderStatus} onChange={(e) => handleChangeOrderStatus(token, order.id, e.target.value)}>
                                    <option>Not Process</option>
                                    <option>Processing</option>
                                    <option>Complete</option>
                                    <option>Cancelled</option>
                                </select>
                            </td>
                            <td>action</td>
                        </tr>
                    })}

                </tbody>
            </table>
        </div>
    )
}

export default TableOrder