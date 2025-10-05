import prisma from "../config/prisma.js";
import { v2 as cloudinary } from 'cloudinary';
// Cloudinary Config

 cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.CLOUD_API_KEY,
        api_secret: process.env.CLOUD_API_SECRET // Click 'View API Keys' above to copy your API secret
 })
export const createProduct = async(req,res)=>{
    try {
        const {title,description,price,quantity,categoryId,images} = req.body
        const product = await prisma.product.create({
            data:{
                title,description,price:parseFloat(price),quantity:parseInt(quantity),categoryId:parseInt(categoryId),images:{
                    create:images.map((item)=>({
                        asset_id:   item.asset_id,
                        public_id:  item.public_id,
                        url:        item.url,
                        secure_url: item.secure_url
                    }))
                }
            }
        })

        return res.status(201).json({message:'Created Product Successfully',data:product})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:'Internal Server Error'})
    }
}

export const getOne = async(req,res)=>{
    try {
        const id = +req.params.id
        const product = await prisma.product.findFirst({where:{id},include:{category:true,images:true}})
        return res.status(200).json({message:`Fetched Product With ID: ${id}  Successfully`,data:product})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:'Internal Server Error'})
    }
}

export const getAllProducts = async(req,res)=>{
    console.log("Query",req.query);
    try {
        const categoryId = req.query.categoryId
        let products = []
        if(categoryId){
              products = await prisma.product.findMany({where:{categoryId:Number(categoryId)},orderBy:{createdAt:'desc'},include:{category:true,images:true}})
        }else{
            products = await prisma.product.findMany({orderBy:{createdAt:'desc'},include:{category:true,images:true}})
        }
        return res.status(200).json({message:'Fetched Products Successfully',data:products})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:'Internal Server Error'})
    }
}
export const removeProduct = async(req,res)=>{
    try {
        let {id} = req.params
        id = +id
        const product = await prisma.product.findFirst({
            where:{id},
            include:{images:true}
        })
        if(!product){
            return res.status(404).json({message:'Product Not Found'})
        }
        const deletedImages = product.images?.map((image)=> new Promise((resolve,reject)=>{
            cloudinary.uploader.destroy(image.public_id,(error,result)=>{
                if(error) reject(error)
                else resolve(result)
            })
        }))
        await Promise.all(deletedImages)

        const deletedProduct = await prisma.product.delete({where:{
            id
        }})
        return res.status(200).json({message:'Delete Product Successfully !',data:deletedProduct})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:'Internal Server Error'})
    }
}

export const listProductBy = async(req,res)=>{
    try {
       const {sort,order,limit} = req.body
        const products = await prisma.product.findMany({take:limit,orderBy:{[sort]:order},include:{category:true,images:true}})
        return res.status(200).json({message:'Fetched Products Successfully !',data:products})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:'Internal Server Error'})
    }
}

export const handleQuery = async(req,res,query)=>{
    try {
        const products = await prisma.product.findMany({where:{
            title:{
                contains:query
            }
        },include:{
            category:true,
            images:true
        }})
        return res.send(products)
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:'Search Error'})
    }
}
export const handlePrice = async(req,res,query)=>{
    try {
        const products = await prisma.product.findMany({where:{
            price:{
                gte:query[0],
                lte:query[1]
            }
        },include:{
            category:true,
            images:true
        }})
        return res.send(products)
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:'Search Error'})
    }
}
export const handleCategory = async(req,res,query)=>{
    try {
        const products = await prisma.product.findMany({where:{
            categoryId:{
                in:query.map(id=>Number(id))
            }
        },include:{
            category:true,
            images:true
        }})
       return res.send(products)
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:'Search Error'})
    }
}
export const searchFilter = async(req,res)=>{
    try {
        const {query,category,price} = req.body
        if(query){
            console.log(query);
            await handleQuery(req,res,query)
        }
        if(category){
            console.log(category);
            await handleCategory(req,res,category)
        }
        if(price){
            console.log(price);
            await handlePrice(req,res,price)
        }
        // return res.status(200).json({message:'Search Filter Product !'})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:'Internal Server Error'})
    }
}
export const updateProduct = async(req,res)=>{
    try {
      const {title,description,price,quantity,categoryId,images} = req.body
    //   clear images
      await prisma.image.deleteMany({
        where:{productId:Number(req.params.id)}
      })
        const product = await prisma.product.update({where:{id:Number(req.params.id)},data:{
            title,description,price:parseFloat(price),quantity:parseInt(quantity),categoryId:parseInt(categoryId),images:{
                create:images.map((item)=>({
                    asset_id:   item.asset_id,
                    public_id:  item.public_id,
                    url:        item.url,
                    secure_url: item.secure_url
                }))
            }
        }})
        return res.status(200).json({message:'Updated Product Successfully !',data:product})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:'Internal Server Error'})
    }
}




export const uploadImages = async(req,res)=>{
    try {
        const result = await cloudinary.uploader.upload(req.body.image,{public_id:`BaoAn-${Date.now()}`,resource_type:'auto',folder:'ecomsql'})
        return res.status(201).json({message:'Uploaded Product Images Successfully !',data:result})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:'Internal Server Error'})
    }
}

export const deleteImages = async(req,res)=>{
    try {
        const {public_id} = req.body
        cloudinary.uploader.destroy(public_id,(result)=>{
          return  res.send({message:'Deleted Product Images Successfully !'})
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:'Internal Server Error'})
    }
}
