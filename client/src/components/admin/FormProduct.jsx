import React, { useEffect, useState } from 'react'
import useEcomStore from '../../store/store'
import { createProduct, deleteProduct } from '../../api/product'
import { toast } from 'react-toastify'
import UploadImages from './UploadImages'
import { Link } from 'react-router-dom'
import { numberWithCommas } from '../../utils/helper'
const FormProduct = () => {
    const initialState = {
        title: "",
        description: "",
        price: "",
        quantity: "",
        categoryId: "",
        images: []
    }

    const token = useEcomStore((state) => state.token)
    const getCategoryList = useEcomStore((state) => state.getCategoryList)
    const getProductList = useEcomStore((state) => state.getProductList)
    const categoryList = useEcomStore((state) => state.categories)
    const productList = useEcomStore((state) => state.products)
    const [formValues, setFormValues] = useState(initialState)
    const handleOnChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setFormValues((prev) => {
            return { ...prev, [name]: value }
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await createProduct(token, formValues)
            toast.success(res.data.message);
            setFormValues({
                title: "",
                description: "",
                price: "",
                quantity: "",
                categoryId: "",
                images: []
            })
            getProductList()
        } catch (error) {
            console.log(error);
        }

    }
    const handleDelete = async (token, id) => {
        try {
            const res = await deleteProduct(token, id)
            toast.success(res.data.message)
            getProductList()
        } catch (error) {
            console.log(error)
        }


    }
    useEffect(() => {
        getCategoryList()
        getProductList()
    }, [])

    return (
        <div className='container mx-auto bg-white p-4 shadow-md'>
            <form onSubmit={handleSubmit}>
                <h1 className='text-2xl font-semibold'>Add Product</h1>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr>
                                <th className="text-left py-3 px-4 font-semibold text-gray-700">Product Name</th>
                                <th className="text-left py-3 px-4 font-semibold text-gray-700">Description</th>
                                <th className="text-left py-3 px-4 font-semibold text-gray-700">Price</th>
                                <th className="text-left py-3 px-4 font-semibold text-gray-700">Quantity</th>
                                <th className="text-left py-3 px-4 font-semibold text-gray-700">Category</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b bg-gray-50/30">
                                <td className="py-3 px-4">
                                    <input type="text" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500" value={formValues.title} placeholder='Product Name' name='title' onChange={handleOnChange} />
                                </td>
                                <td className="py-3 px-4">
                                    <input type="text" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500" value={formValues.description} placeholder='Description' name='description' onChange={handleOnChange} />
                                </td>
                                <td className="py-3 px-4">
                                    <input type="number" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500" value={formValues.price} placeholder='Price' name='price' onChange={handleOnChange} />
                                </td>
                                <td className="py-3 px-4">
                                    <input type="text" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500" value={formValues.quantity} placeholder='Quantity' name='quantity' onChange={handleOnChange} />
                                </td>
                                <td className="py-3 px-4">
                                    <select className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500" name='categoryId' onChange={handleOnChange} required value={formValues.categoryId}>
                                        <option value="" disabled>Select a category</option>
                                        {categoryList?.length > 0 && categoryList.map((item, index) => {
                                            return <option key={index} value={item.id}>{item.name}</option>
                                        })}
                                    </select>
                                </td>

                                {/* Upload Images */}
                            </tr>
                            <tr className="border-b bg-gray-50/30">
                                <td className="py-3 px-4" colSpan={4}>
                                    <p className='mb-3'>UpLoad Images:</p>
                                    <UploadImages formValues={formValues} setFormValues={setFormValues} />
                                </td>
                                <td className="py-3 px-4">
                                    <button type='submit' className='bg-green-500 py-1 px-2 text-white rounded-md'>Add Product</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </form>
            <h1 className='text-center text-2xl font-semibold mb-8'>List Products</h1>
            <table className='w-full'>
                <thead>
                    <tr className='w-full bg-gray-200'>
                        <th>ID</th>
                        <th>Product Name</th>
                        <th>Images</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Category</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {productList?.length > 0 && productList.map((item, index) => {
                        console.log();

                        return <tr key={item.id} className='w-full text-center'>
                            <td>{index + 1}</td>
                            <td>{item.title}</td>
                            <td className='flex items-center justify-center'>
                                {item.images.length > 0 ? <img src={item.images[0].url} className='w-24 h-24 rounded-lg' /> : <div className='w-24 h-24 bg-gray-200 flex items-center justify-center'>No Images</div>}
                            </td>
                            <td>{item.description}</td>
                            <td>{item.price}</td>
                            <td>{item.quantity}</td>
                            <td>{item.category?.name || 'No Category'}</td>
                            <td className='flex gap-2 items-center justify-center'>
                                <Link to={`${item.id}`} className='py-1 px-2 bg-yellow-500 text-white rounded-md'>Edit</Link>
                                <button className='py-1 px-2 bg-red-500 text-white rounded-md' onClick={() => handleDelete(token, item.id)} >Delete</button>
                            </td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default FormProduct