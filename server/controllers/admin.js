import prisma from "../config/prisma.js";

export const changeOrderStatus = async(req,res)=>{
    try {
        const {orderId,orderStatus} = req.body
        const orderUpdate = await prisma.order.update({
            where:{id:orderId},
            data:{orderStatus:orderStatus}
        })
        return res.status(201).json({message:'Change Order Status Successfully',data:orderUpdate})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Internal Server Error"})
    }
}

export const getOrderAdmin = async(req,res)=>{
    try {
        const orders = await prisma.order.findMany({
            include:{
                products:{
                    include:{
                        product:true
                    }
                },
                orderedBy:{
                    select:{id:true,email:true,address:true}
                }
            }

        })
        return res.status(200).json({message:'Get Orders Successfully',data:orders})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Internal Server Error"})
    }
}