import axios from 'axios'
export const getOrdersAdmin = async (token) => {
    return axios.get('http://localhost:8080/api/admin/orders', { headers: { Authorization: `Bearer ${token}` } })
}
export const changeOrderStatus = async (token, orderId, orderStatus) => {
    return axios.put('http://localhost:8080/api/admin/order-status', { orderId, orderStatus }, { headers: { Authorization: `Bearer ${token}` } })
}