import prisma from "../config/prisma.js";
export const getAllUser = async(req,res)=>{
    try {
        const users = await prisma.user.findMany({
            select:{
                id:true,
                email:true,
                role:true,
                enabled:true,
                address:true
            }
        })
        return res.status(200).json({message:'Fetched User Successfully',data:users})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:'Internal Server Error'})
    }
}
export const changeStatus = async(req,res)=>{
    try {
        const { id, enabled } = req.body
        const user = await prisma.user.update({
            where:{id},
            data:{enabled}
        })
        return res.status(200).json({message:'Change Status Successfully',data:user})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:'Internal Server Error'})
    }
}

export const changeRole = async(req,res)=>{
    try {
        const { id, role } = req.body
        const user = await prisma.user.update({
            where:{id},
            data:{role}
        })
        return res.status(200).json({message:'Change Role Successfully',data:user})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:'Internal Server Error'})
    }
}

export const userCart = async(req,res)=>{
    try {
        const {cart} = req.body
        console.log(cart);
        console.log(req.user.id);
        const user = await prisma.user.findFirst({
            where:{id:Number(req.user.id)}
        })
        await prisma.productOnCart.deleteMany({
            where:{
                cart:{
                    orderedById:user.id
                }
            }
        })
        await prisma.cart.deleteMany({
            where:{
                orderedById:user.id
            }
        })
        let products = cart.map((item)=>({
            productId:item.id,
            count:item.count,
            price:item.price
        }))
        let cartTotal = products.reduce((sum,item) => sum + item.price * item.count,0)
        // New cart
        const newCart = await prisma.cart.create({
            data:{
                products:{
                    create:products
                },
                cartTotal:cartTotal,
                orderedById:user.id
            }
        })
        return res.status(200).json({message:'Add User  Cart Successfully'})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:'Internal Server Error'})
    }
}
export const getUserCart = async(req,res)=>{
    try {
        const cart = await prisma.cart.findFirst({
            where:{
                orderedById:Number(req.user.id)
            },
            include:{
                products:{
                    include:{
                        product:true
                    }
                }
            }
        })

        return res.status(200).json({message:'Get User Cart Successfully',data:{products:cart.products,cartTotal:cart.cartTotal}})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:'Internal Server Error'})
    }
}
export const emptyCart = async(req,res)=>{
    try {
        const cart = await prisma.cart.findFirst({
            where:{orderedById:Number(req.user.id)}
        })
        if(!cart){
            return res.status(400).json({message:'No cart Found'})
        }
        await prisma.productOnCart.deleteMany({
            where:{cartId:cart.id}
        })
        const result = await prisma.cart.deleteMany({
            where:{orderedById:Number(req.user.id)}
        })
        return res.status(200).json({message:'Delete User Cart Successfully',deletedCount:result.count})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:'Internal Server Error'})
    }
}
export const saveAddress = async(req,res)=>{
    try {
        const {address} = req.body
        const addressUser = await prisma.user.update({
            where:{
                id:Number(req.user.id)
            },
            data:{
                address
            }
        })
        return res.status(200).json({message:'Save User Address Successfully'})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:'Internal Server Error'})
    }
}
export const saveOrder = async(req,res)=>{
    try {
        const userCart = await prisma.cart.findFirst({
            where:{
                orderedById:Number(req.user.id)
            },
            include:{products:true}
        })
        // Check Cart Empty
        if(!userCart || userCart.products.length === 0){
            return res.status(400).json({message:'Cart Is Empty'})
        }
        //  Check Cart Quantity
        for (const item of userCart.products) {
            console.log(item);
            const product = await prisma.product.findUnique({
                where:{id:item.productId},
                select: {quantity:true,title:true}
            })
            if(!product || item.count > product.quantity){
                return res.status(400).json({
                    message:`Product ${product?.title} not found or out of stock`
                })
            }
            // Create Order
            const order = await prisma.order.create({
                data:{
                    products:{
                        create:userCart.products.map((item)=>({
                            productId:item.productId,
                            count:item.count,
                            price:item.price
                        }))
                    },
                    orderedBy:{
                        connect:{id:req.user.id}
                    },
                    cartTotal:userCart.cartTotal
                }
            })
        }
        // Update Product
        const update = userCart.products.map((item)=>({
            where:{id:item.productId},
            data:{
                quantity:{decrement:item.count},
                sold:{increment:item.count}
            }
        }))
        await Promise.all(
            update.map((updated)=> prisma.product.update(updated))
        )
        await prisma.cart.deleteMany({
            where:{orderedById: Number(req.user.id)}
        })
    
        return res.status(200).json({message:'Save User Order Successfully',data:order})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:'Internal Server Error'})
    }
}
export const getOrder = async(req,res)=>{
    try {
        const orders = await prisma.order.findMany({
            where:{
                orderedById:Number(req.user.id),
            },
            include:{
                products:{
                    include:{product:true}
                }
            }
        })
        console.log(orders);
        if(orders.length ===0){
            return res.status(400).json({message:'No Orders'})
        }
        return res.status(200).json({message:'Get User Order Successfully',data:orders})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:'Internal Server Error'})
    }
}