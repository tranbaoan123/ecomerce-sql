import axios from 'axios'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { listCategory } from '../api/category'
import { filterProduct, getProductById, listProduct, listProductByCategoryId, updateProduct } from '../api/product'
import _ from 'lodash'
const ecomStore = (set, get) => ({
    user: null,
    token: null,
    categories: [],
    categoryMaxPageSize: 1,
    products: [],
    carts: [],
    productById: null,
    actionLogin: async (formValues) => {
        const res = await axios.post('http://localhost:8080/api/auth/login', formValues)
        set({
            user: res.data.payload,
            token: res.data.token,

        })
        return res
    },
    actionLogout: () => {
        set({
            user: null,
            token: null
        })
    },
    updateQuantity: (productId, newQuantity) => {
        set((state) => ({
            carts: state.carts.map((item) => item.id === productId ? { ...item, count: Math.max(1, newQuantity) } : item)
        }))

    },
    removeProductFromCart: (productId) => {
        console.log(productId);
        set((state) => ({
            carts: state.carts.filter((item) => item.id !== productId)
        }))

    },
    getTotalPrice: () => {
        return get().carts.reduce((total, item) => {
            return total + item.price * item.count
        }, 0)
    },
    addToCart: async (product) => {
        const carts = get().carts
        const updatedCart = [...carts, { ...product, count: 1 }]
        // Step Unique
        const unique = _.unionWith(updatedCart, _.isEqual)
        set({ carts: unique })

    },
    clearCart: () => {
        set({ carts: [] })

    },
    getCategoryList: async (page = 1) => {
        try {
            const res = await listCategory(page)
            set({ categories: res.data.data, categoryMaxPageSize: res.data.maxPageSize });
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
    getProductListByCategoryId: async (categoryId) => {
        try {
            const res = await listProductByCategoryId(categoryId)
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