import axios from "axios"

export const addUserCart = async (token, data) => {
    return await axios.post('http://localhost:8080/api/user/user-cart', data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const listUserCart = async (token) => {
    return await axios.get('http://localhost:8080/api/user/user-cart', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const saveUserAddress = async (token, data) => {
    return await axios.post('http://localhost:8080/api/user/user-address', { address: data }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}


export const saveOrder = async (token) => {
    return await axios.post('http://localhost:8080/api/user/user-order', {}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}


export const getUserOrders = async (token) => {
    return await axios.get('http://localhost:8080/api/user/user-order', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}
