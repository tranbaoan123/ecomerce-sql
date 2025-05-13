import jwt from 'jsonwebtoken'
import prisma from '../config/prisma.js'
export const authCheck = async (req,res,next)=>{
    try {
        const headerToken = req.headers.authorization
        if(!headerToken){
            return res.status(401).json({message:'Authorization Failed'})
        }
        const token = headerToken.split(" ")[1]
        const decode = jwt.verify(token,process.env.JWT_SECRET)
        req.user = decode;
        const user = await prisma.user.findFirst({
            where:{
                email:req.user.email
            }
        })
        if(!user.enabled) return res.status(401).json({message:'This Account Is Disabled'})
        next()
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:'Token Invalid'})
    }
}
export const adminCheck = async (req,res,next)=>{
    try {
       const {role} = req.user
       return role === 'user' ? res.status(403).json({message:'Access Denied,Admin Only'}):next()

    } catch (error) {
        console.log(error);
        return res.status(500).json({message:'Admin Access Denied'})
    }
}