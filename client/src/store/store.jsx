import axios from 'axios'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { listCategory } from '../api/category'
import { filterProduct, getProductById, listProduct } from '../api/product'
const ecomStore = (set) => ({
    user: null,
    token: null,
    categories: [],
    products: [],
    productById: null,
    actionLogin: async (formValues) => {
        const res = await axios.post('http://localhost:8080/api/auth/login', formValues)
        set({
            user: res.data.payload,
            token: res.data.token,

        })
        return res
    },
    getCategoryList: async () => {
        try {
            const res = await listCategory()
            set({ categories: res.data.data });
        } catch (error) {
            console.log(error);
        }
    },
    getProductList: async () => {
        try {
            const res = await listProduct()
            set({ products: res.data.data });
        } catch (error) {
            console.log(error);
        }
    },
    getOne: async (id) => {
        try {
            const res = await getProductById(id)
            set({ productById: res.data.data });
        } catch (error) {
            console.log(error);
        }
    },
    searchFilter: async (arg) => {
        try {
            const res = await filterProduct(arg)
            set({ products: res.data });
        } catch (error) {
            console.log(error);
        }
    }
})
const usePersist = {
    name: 'ecomStore',
    storage: createJSONStorage(() => localStorage)
}
const useEcomStore = create(persist(ecomStore, usePersist))
export default useEcomStore