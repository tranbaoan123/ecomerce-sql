import React from 'react'
import SidebarAdmin from '../components/admin/SidebarAdmin'
import HeaderAdmin from '../components/admin/HeaderAdmin'
import { Outlet } from 'react-router-dom'


const LayoutAdmin = () => {
    return (
        <div className='flex h-screen'>
            <SidebarAdmin />
            <div className='flex-1 flex-col'>
                <HeaderAdmin />
                <main className='flex-1 p-6 bg-gray-100 overflow-y-auto'>
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default LayoutAdmin