import authRoutes from './auth.js'
import categoryRoutes from './category.js'
import productRoutes from './product.js'
import userRoutes from './user.js'
import adminRoutes from './admin.js'
const initWebRoutes = (app)=>{
    app.use('/api/auth',authRoutes)
    app.use('/api/category',categoryRoutes)
    app.use('/api/product',productRoutes)
    app.use('/api/user',userRoutes)
    app.use('/api/admin',adminRoutes)
}
export default initWebRoutes