
import { loadStripe } from '@stripe/stripe-js';
import { useEffect } from 'react';
import { payment } from '../../../api/payment';
import useEcomStore from '../../../store/store';
import { useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../checkout-form/CheckoutForm';
const stripePromise = loadStripe('pk_test_51RPa1808ZFfrQL7yvn82fM8uTWYukc7IlyREDBgdyGe7UarS20kcIyXmI62eDazukXxQokBNlXz2fn0VzDxcXyez00SMUT5ym5');
const appearance = {
    theme: 'stripe'
}
const loader = 'auto'
const Payment = () => {
    const token = useEcomStore((state) => state.token)
    const [clientSecret, setClientSecret] = useState('')
    useEffect(() => {
        payment(token).then(res => setClientSecret(res.data.clientSecret)).catch((err) => console.log(err))
    }, [])
    return (
        <div>{clientSecret && (<Elements options={{ clientSecret, appearance, loader }} stripe={stripePromise}>
            <CheckoutForm />
        </Elements>)}</div>
    )
}

export default Payment