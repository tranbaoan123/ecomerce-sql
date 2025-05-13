import prisma from "../config/prisma.js"
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'
import 'dotenv/config'
export const register = async(req,res)=>{
 try {
    const {email, password} = req.body
    if(!email || !password){
        return res.status(400).json({message:'Invalid Credentials'})
    }
    //  Check Email In DB
    const user = await prisma.user.findFirst({
        where:{email}
    })
    if(user){
        return res.status(400).json({message:'Email Is Already Existed'})
    }
    //  Hash Password
    const hashedPassword = await bcrypt.hash(password,10)
    await prisma.user.create({
        data:{
            email,password:hashedPassword
        }
    })
    return res.status(201).json({success:true,message:"Register Successfully"})
 } catch (error) {
    console.log(error);
    return res.status(500).json({
        message:'Internal Server Error'
    })
 }
}

export const login = async(req,res)=>{
    try {
    const {email,password} = req.body
    //  Check Email
        const user = await prisma.user.findFirst({
            where:{email}
        })
    if(!user || !user.enabled){
        return res.status(200).json({
            message:'User Not Found Or Disabled'
        })
    }
    // Check Password
    const isMatchedPassword = await bcrypt.compare(password,user.password)
    if(!isMatchedPassword){
        return res.status(400).json({
            message:"Invalid Password"
        })
    }

    // Create Payload
    const payload = {
        id:user.id,
        email:user.email,
        role:user.role
    }
    //Generate Token
    jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:'1d'},(err,token)=>{
        if(err){
            return res.status(500).json({message:'Server Error'})
        }
        res.json({payload,token})
    })
    } catch (error) {
       console.log(error);
       return res.status(500).json({
           message:'Internal Server Error'
       })
    }
}
export const currentUser = async(req,res)=>{
    try {
        const user = await prisma.user.findFirst({
            where:{email:req.user.email},
            select:{
                id:true,
                email:true,
                role:true,
                name:true
            }
        })
        return res.send(user)
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:'Internal Server Error'
        })
    }
}
