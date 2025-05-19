import { useEffect, useState } from "react"
import { getUserOrders } from "../../../api/user"
import useEcomStore from "../../../store/store"

const HistoryCard = () => {
    const [orders, setOrders] = useState({})
    const token = useEcomStore((state) => state.token)

    useEffect(() => {
        const fetchOrders = async () => {
            const res = await getUserOrders(token)
            setOrders(res.data.data);
        }
        fetchOrders()
    }, [])
    return (
        <div>
            <h1 className="text-2xl font-bold">Order History</h1>
            <div className="space-y-4">
                {/* Card Loop Order */}
                {orders.length > 0 && orders.map((order, index) => {
                    return <div key={index} className="bg-gray-100 p-4 rounded-md shadow-md">
                        {/* header */}
                        <div className="flex justify-between">
                            <div className="">
                                <p className="text-sm">Order date</p>
                                <p className="font-bold">{order?.createdAt}</p>
                            </div>
                            <div className=" bg-red-200 text-red-500 w-36 h-9 flex items-center justify-center rounded-full font-bold">
                                {order?.orderStatus}
                            </div>
                        </div>
                        {/* table */}
                        <div>
                            <table className="border w-full">
                                <thead>
                                    <tr className="bg-gray-200">
                                        <th>Product</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {order?.products.length > 0 && order?.products.map((product, index) => {
                                        return <tr key={index} className="text-center">
                                            <td>{product.product.title}</td>
                                            <td>{product.price}</td>
                                            <td>{product.count}</td>
                                            <td>{product.count * product.price}</td>
                                        </tr>
                                    })}

                                </tbody>
                            </table>
                        </div>
                        {/* Total */}
                        <div className="text-right">
                            <p>Final Price</p>
                            <p className="font-bold">{order?.amount}</p>
                        </div>
                    </div>
                })}
            </div>
        </div>
    )
}

export default HistoryCard