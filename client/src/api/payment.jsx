import axios from 'axios'

export const payment = async (token) => {
    return await axios.post('http://localhost:8080/api/payment/create-payment-intent', {}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}