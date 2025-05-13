import prisma from "../config/prisma.js";

export const createCategory = async(req,res)=>{
    try {
        const {name} = req.body
        if(!name) return res.status(400).json({message:'Missing Inputs'})
        const category = await prisma.category.create({
            data:{
                name
            }
        })
        return res.status(201).json({message:'Created Category Successfully',data:category})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:'Internal Server Error'})
    }
}

export const getAllCategories = async(req,res)=>{
    try {
        const categories = await prisma.category.findMany()
        return res.status(200).json({message:'Fetched Categories Successfully',data:categories})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:'Internal Server Error'})
    }
}
export const removeCategory = async(req,res)=>{
    try {
        let {id} = req.params
        id = +id
        const category = await prisma.category.delete({where:{
            id
        }})
        return res.status(200).json({message:'Delete Category Successfully !',data:category})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:'Internal Server Error'})
    }
}