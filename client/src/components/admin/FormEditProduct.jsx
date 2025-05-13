import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { updateProduct } from '../../api/product'
import useEcomStore from '../../store/store'
import UploadImages from './UploadImages'
const FormEditProduct = () => {
    const params = useParams()
    const { id } = params


    const token = useEcomStore((state) => state.token)
    const getCategoryList = useEcomStore((state) => state.getCategoryList)
    const getProductById = useEcomStore((state) => state.getOne)
    const categoryList = useEcomStore((state) => state.categories)
    const productById = useEcomStore((state) => state.productById)
    const initialState = {
        title: productById?.title,
        description: productById?.description,
        price: productById?.price,
        quantity: productById?.quantity,
        categoryId: productById?.categoryId,
        images: productById?.images
    }
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
            const res = await updateProduct(token, id, formValues)
            toast.success(res.data.message);

        } catch (error) {
            console.log(error);
        }

    }
    useEffect(() => {
        getCategoryList()
        getProductById(id)
    }, [id])

    return (
        <div className='container mx-auto bg-white p-4 shadow-md'>
            <form onSubmit={handleSubmit}>
                <h1 className='text-2xl font-semibold'>Edit Product</h1>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-50">
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
                                    <input type="number" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500" value={formValues.quantity} placeholder='Quantity' name='quantity' onChange={handleOnChange} />
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
                                    <p className='mb-3'>Upload Images:</p>
                                    <UploadImages formValues={formValues} setFormValues={setFormValues} />
                                </td>
                                <td className="py-3 px-4">
                                    <button type='submit' className='bg-yellow-500 py-1 px-2 text-white rounded-md'>Edit Product</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </form>
        </div>
    )
}

export default FormEditProduct