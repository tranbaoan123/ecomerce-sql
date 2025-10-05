import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import EditProduct from '../components/admin/EditProduct'
import Layout from '../layouts/Layout'
import LayoutAdmin from '../layouts/LayoutAdmin'
import LayoutUser from '../layouts/LayoutUser'
import Cart from '../pages/Cart'
import Checkout from '../pages/Checkout'
import Home from '../pages/Home'
import Shop from '../pages/Shop'
import Category from '../pages/admin/Category'
import DashBoard from '../pages/admin/DashBoard'
import Manage from '../pages/admin/Manage'
import Product from '../pages/admin/Product'
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import HomeUser from '../pages/user/HomeUser'
import History from '../pages/user/History'
import ProtectRouteAdmin from './ProtectRouteAdmin'
import ProtectRouteUser from './ProtectRouteUser'
import ManageOrder from '../components/admin/ManageOrder'
import ProductDetail from '../pages/ProductDetail'
const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            { path: '/', element: <Home />, index: true },
            { path: 'product/:id', element: <ProductDetail /> },
            { path: 'shop', element: <Shop /> },
            { path: 'cart', element: <ProtectRouteUser element={<Cart />} /> },
            { path: 'checkout', element: <Checkout /> },
            { path: 'login', element: <Login /> },
            { path: 'register', element: <Register /> },
        ]
    },
    {
        path: '/admin',
        element: <ProtectRouteAdmin element={<LayoutAdmin />} />,
        children: [
            {
                index: true, element: <DashBoard />
            },
            {
                path: 'category', element: <Category />
            },
            {
                path: 'product', element: <Product />
            },
            {
                path: 'product/:id', element: <EditProduct />
            },
            {
                path: 'manage', element: <Manage />
            },
            {
                path: 'orders', element: <ManageOrder />
            }
        ]
    },
    {
        path: '/user',
        element: <ProtectRouteUser element={<LayoutUser />} />,
        children: [
            {
                index: true, element: <HomeUser />
            },
            {
                path: 'history', element: <History />
            }
        ]
    }
])


const AppRoute = () => {
    return (
        <RouterProvider router={router} />
    )
}

export default AppRoute