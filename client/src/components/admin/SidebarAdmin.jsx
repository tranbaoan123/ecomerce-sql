import { ArrowLeftToLine, House, LayoutDashboard } from 'lucide-react';
import { NavLink } from 'react-router-dom';
const SidebarAdmin = () => {
    return (
        <div className='bg-gray-800 w-64 text-white flex flex-col h-screen'>
            <div className='h-24 bg-gray-900 flex items-center justify-center text-2xl font-bold border-b border-b-gray-500'>Admin Panel</div>
            <nav className='flex-1 space-y-2'>
                <NavLink to={'/admin'} className={({ isActive }) => `flex items-center gap-2 hover:bg-gray-700 ${isActive ? 'bg-gray-900 p-2 text-white' : ''}`}>
                    <LayoutDashboard />
                    <span>Dashboard</span>
                </NavLink>

                <NavLink to={'manage'} className={({ isActive }) => `flex items-center p-2 gap-2 hover:bg-gray-700 ${isActive ? 'bg-gray-900 text-white' : ''}`}>
                    <LayoutDashboard />
                    <span>Manage</span>
                </NavLink>
                <NavLink to={'category'} className={({ isActive }) => `flex items-center p-2 gap-2 hover:bg-gray-700 ${isActive ? 'bg-gray-900 text-white' : ''}`}>
                    <LayoutDashboard />
                    <span>Category</span>
                </NavLink>
                <NavLink to={'product'} className={({ isActive }) => `flex items-center p-2 gap-2 hover:bg-gray-700 ${isActive ? 'bg-gray-900 text-white' : ''}`}>
                    <LayoutDashboard />
                    <span>Product</span>
                </NavLink>
                <NavLink to={'orders'} className={({ isActive }) => `flex items-center p-2 gap-2 hover:bg-gray-700 ${isActive ? 'bg-gray-900 text-white' : ''}`}>
                    <LayoutDashboard />
                    <span>Orders</span>
                </NavLink>
            </nav>
            <footer>

                <NavLink to={'/'} className={({ isActive }) => `flex items-center p-2 gap-2 hover:bg-gray-700 ${isActive ? 'bg-gray-900 p-2 text-white' : ''}`}>
                    <House />
                    <span>Go To Homepage</span>
                </NavLink>

                <NavLink className={({ isActive }) => `flex items-center p-2 gap-2 hover:bg-gray-700 ${isActive ? 'bg-gray-900 p-2 text-white' : ''}`}>
                    <ArrowLeftToLine />
                    <span>Logout</span>
                </NavLink>
            </footer>
        </div>
    )
}

export default SidebarAdmin