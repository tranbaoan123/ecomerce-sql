import axios from 'axios'

export const currentUser = async (token) => {
    return await axios.post('http://localhost:8080/api/auth/current-user', {}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}
export const currentAdmin = async (token) => {
    return await axios.post('http://localhost:8080/api/auth/current-admin', {}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}