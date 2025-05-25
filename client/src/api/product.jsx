import axios from "axios"
export const createProduct = async (token, form) => {
    return axios.post('http://localhost:8080/api/product', form, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}
export const listProduct = async () => {
    return axios.get('http://localhost:8080/api/product')
}

export const listProductByCategoryId = async (categoryId) => {

    return axios.get(`http://localhost:8080/api/product`, {
        params: {
            categoryId: categoryId
        }
    })

}



export const filterProduct = async (arg) => {
    return axios.post('http://localhost:8080/api/product/search/filters', arg)
}


export const listProductBy = async (sort, order, limit) => {
    return axios.post('http://localhost:8080/api/product/productby', { sort, order, limit })
}

export const getProductById = async (id) => {
    return axios.get('http://localhost:8080/api/product/' + id)
}
export const uploadImages = async (token, data) => {
    return axios.post('http://localhost:8080/api/product/upload-images', { image: data }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}
export const updateProduct = async (token, id, form) => {

    return axios.put('http://localhost:8080/api/product/' + id, form, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}
export const deleteImages = async (token, public_id) => {
    return axios.post('http://localhost:8080/api/product/delete-images', { public_id }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}


export const deleteProduct = async (token, id) => {
    return axios.delete('http://localhost:8080/api/product/' + id, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}