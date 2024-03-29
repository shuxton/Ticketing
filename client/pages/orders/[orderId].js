import { useEffect, useState } from 'react'
import useRequest from '../../hooks/use-request'
import StripeCheckout from 'react-stripe-checkout'
import Router from 'next/router'

const OrderShow = ({order, currentUser})=>{
    const [timeLeft, setTimeLeft] = useState(0)

    useEffect(()=>{
const findTimeLeft = ()=>{
    const msLeft = new Date(order.expiresAt) - new Date()
    setTimeLeft(Math.round(msLeft/1000))
}
findTimeLeft()
const timerId=setInterval(findTimeLeft,1000)

return()=>{
    clearInterval(timerId)
}
    },[order])


  


    const {doRequest,errors} = useRequest({
        url:'/api/payments',
        method:'post',
        body:{
            orderId: order.id,
          },
          onSuccess: () => Router.push('/orders')
    })

    if(timeLeft<0){
        return <div>Order Expired</div>
    }

    return <div>
        <div>Time left to pay: {timeLeft} seconds</div>
        <StripeCheckout
        token={({id})=>doRequest({token:id})}
        stripeKey="pk_test_51IFLy7FHMYJti3tLbJe2hUGZfezofi4RDqJEjmvRTV8hYAWlajZHmjmaqc8D8axTU3mYpCnqeC0SnVI46PEXydr000kIm9GZ6C"
        amount={order.ticket.price*100}
        currency='INR'
        email={currentUser.email}
        />
        {errors}
    </div>
}

OrderShow.getInitialProps = async (context,client) =>{
    const {orderId} = context.query;
    const {data} = await client.get(`/api/orders/${orderId}`)
    return {order:data}
}

export default OrderShow