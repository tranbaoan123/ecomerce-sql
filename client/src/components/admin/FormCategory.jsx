import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { createCategory, listCategory, removeCategory } from '../../api/category'
import useEcomStore from '../../store/store'
const FormCategory = () => {
    const token = useEcomStore((state) => state.token)
    const [categoryName, setCategoryName] = useState('')
    const categoryList = useEcomStore((state) => state.categories)
    const getCategoryList = useEcomStore((state) => state.getCategoryList)
    const onDeleteCategory = async (id) => {
        try {
            const res = await removeCategory(token, id)
            toast.success(res.data.message);
            getCategoryList()
        } catch (error) {
            console.log(error);
        }
    }
    const onHandleSubmit = async (e) => {
        e.preventDefault()
        if (!categoryName) toast.error('Please Enter Category Name')
        try {
            const res = await createCategory(token, { name: categoryName })
            console.log(res.data.name);

            toast.success(res.data.message)
            setCategoryName('')
            getCategoryList()
        } catch (error) {
            toast.error()
            console.log(error);
        }
    }
    useEffect(() => {
        getCategoryList()
    }, [])
    return (
        <div className='container mx-auto bg-white p-4 shadow-md'>
            <h1 className='text-2xl font-semibold'>Category Management</h1>
            <form action="" className='my-4 flex gap-2' onSubmit={onHandleSubmit}>
                <input type="text" className='border py-1 px-4 text-lg w-[300px]' placeholder='Add Category' onChange={(e) => setCategoryName(e.target.value)} />
                <button type='submit' className='bg-blue-500 py-2 px-4 rounded-full text-white'>Add Category</button>
            </form>
            <hr />
            <table className="w-[80%] mx-auto text-center">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {categoryList?.length > 0 && categoryList.map((item, index) => {
                        return <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td>{item.name}</td>
                            <td className='flex gap-2 items-center justify-center'>
                                <button className='py-1 px-2 bg-yellow-500 text-white rounded-md'>Edit</button>
                                <button onClick={() => onDeleteCategory(item.id)} className='py-1 px-2 bg-red-500 text-white rounded-md'>Delete</button>
                            </td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default FormCategory