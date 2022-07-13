import React, { useEffect,useState } from 'react'
import {Helmet} from "react-helmet-async"
import {Form,Button} from "react-bootstrap"
import {Store} from "../Store"
import {useContext} from "react"
import {useNavigate}from "react-router-dom"

export default function PaymentmethodScreen() {
    const [paymentMethodName,setPaymentMethod]=useState()
    const {state,dispatch:cxtDispatch}=useContext(Store)
    const {
        cart:{shippingAddress,paymentMethod}
    }=state
    const navigate=useNavigate()
    useEffect(()=>{
        if(!shippingAddress){
            navigate('/shipping')
        }
    })
    const submithandler=(e)=>{
        e.preventDefault()
        cxtDispatch({type:'SAVE_PAYMENT_METHOD',payload:paymentMethodName})
        localStorage.setItem('paymentMethod',paymentMethodName)
        navigate('/placeorder')
    }
  return (
    <div className='container small-container'>
        <Helmet>
            <title>Payment Method</title>
        </Helmet>
        <h1 className='mb-3'>Payment Method</h1>
        <Form onSubmit={submithandler}>
        <div className='mb-3'>
               <Form.Check
               type="radio"
               id="RazorPay"
               label="RazorPay"
               value="RazorPay"
               checked={paymentMethodName==="RazorPay"}
               onChange={(e)=>setPaymentMethod(e.target.value)}
               >
               </Form.Check>
               <div className='mb-3'>
                   <Button type="submit">Continue</Button>
               </div>
        </div>
        </Form>
    </div>
  )
}
