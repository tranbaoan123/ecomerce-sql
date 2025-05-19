import prisma from "../config/prisma.js";
import Stripe from 'stripe'
const stripe = new Stripe('sk_test_51RPa1808ZFfrQL7yu1ZMIxAov8JeOuZ8GfHHmA1fIDencdHH3MJomwGTC9p42Vn6tNBe6rUiDidyZsyhOf3moPP600lTc9gjdX')
export const payment = async(req,res)=>{
    try {
       const paymentIntent = await stripe.paymentIntents.create({
        amount: 1099,
        currency: 'usd',
        automatic_payment_methods:{
            enabled:true
        }
    });

    res.send(
        {clientSecret:paymentIntent.client_secret}
    )
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:'Internal Server Error'})
    }
}