import { useEffect, useState } from "react"
import { changeUserStatus, getUsersAdmin } from "../../api/admin"
import useEcomStore from "../../store/store"
import { toast } from 'react-toastify'
const TableUser = () => {
    const token = useEcomStore((state) => state.token)
    const [users, setUsers] = useState([])
    const fetchUser = async () => {
        const res = await getUsersAdmin(token)
        setUsers(res.data.data);
    }
    useEffect(() => {
        fetchUser()
    }, [])
    const handleChange = async (token, userId, value) => {
        try {
            const res = await changeUserStatus(token, { id: userId, enabled: value == 0 ? false : true })
            toast.success(res.data.message)
            fetchUser()
        } catch (error) {
            console.log(error);
        }

    }
    return (
        <div className='container mx-auto bg-white p-4 shadow-md'>
            <table className="w-full">
                <thead>
                    <tr className="bg-gray-50">
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">ID</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Email</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Role</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users?.map((user, index) => {
                        return <tr key={user.id}>
                            <td>{index + 1}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>{user.enabled ? 'Active' : 'Inactive'}</td>
                            <td>
                                <select onChange={(e) => handleChange(token, user.id, e.target.value)}>
                                    <option value="" disabled selected>Select Option</option>
                                    <option value={0}>Disable</option>
                                    <option value={1}>Enable</option>
                                </select>
                            </td>
                        </tr>
                    })}


                </tbody>
            </table>
        </div>
    )
}

export default TableUser