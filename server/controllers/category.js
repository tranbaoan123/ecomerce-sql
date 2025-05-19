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
        const page = Number(req.query.page)
        let filterCategories = []
        let allCategories = await prisma.category.findMany()
        const categoryPerPage = process.env.LIMIT_CATEGORY_PER_PAGE
        const maxPageSize = Math.ceil(allCategories.length / Number(categoryPerPage))
        if(page){
            const skip = (page - 1) * categoryPerPage
             filterCategories = await prisma.category.findMany({skip,take:Number(categoryPerPage)})
            return res.status(200).json({message:'Fetched Categories Successfully',data:filterCategories,maxPageSize})
        }else{
            return res.status(200).json({message:'Fetched Categories Successfully',data:allCategories,maxPageSize})
        }
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