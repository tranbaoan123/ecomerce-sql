import express from 'express'
import 'dotenv/config'
import morgan from 'morgan'
import initWebRoutes from './routes/index.js'
import cors from 'cors'
const app = express()
app.use(morgan('dev'))
app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json({limit:'20mb'}))
// init Web Routes
initWebRoutes(app)
const PORT = process.env.PORT || 8000


app.listen(PORT,()=>{
    console.log('Server is running on port ' + PORT);
})
