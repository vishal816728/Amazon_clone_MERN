import React,{useState,useContext,useEffect} from 'react'
import { Helmet } from 'react-helmet-async'
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { Store } from '../Store'
import { useNavigate } from 'react-router-dom'

export default function ShippingAddressScreen() {
    const [fullName,setFullName]=useState()
    const [address,setAddress]=useState()
    const [city,setCity]=useState()
    const [postalcode,setPostalCode]=useState()
    const [country,setCountry]=useState()
    const {state,dispatch:cxtDispatch}=useContext(Store)
    const {userInfo}=state
    const navigate=useNavigate()
    useEffect(()=>{
        if(!userInfo){
            navigate("/signin")
        }
    },[])
    const submitHandler=(e)=>{
        e.preventDefault()
        cxtDispatch({
            type:"SAVE_SHIPPING_ADDRESS",
            payload:{
                fullName,
                address,
                city,
                postalcode,
                country
            }
        })
        localStorage.setItem('shippingAddress',
        JSON.stringify({
            fullName,
                address,
                city,
                postalcode,
                country
        }))
        navigate("/payment")
    }
  return (
    <div>
        <Helmet>
            <title>Shipping Address</title>
        </Helmet>
        <h1 className="m-3 ml-5">Shipping Address Form</h1>
        <div className="container small-container">
        <Form onSubmit={submitHandler}>
             <Form.Group className="mb-3" controlId="fullName">
                <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    value={fullName}
                    onChange={(e)=>setFullName(e.target.value)}
                    required
                  >
                  </Form.Control>
             </Form.Group>
             <Form.Group className="mb-3" controlId="address">
                <Form.Label>Address</Form.Label>
                  <Form.Control
                    value={address}
                    onChange={(e)=>setAddress(e.target.value)}
                    required
                  >
                  </Form.Control>
             </Form.Group>
             <Form.Group className="mb-3" controlId="city">
                <Form.Label>City</Form.Label>
                  <Form.Control
                    value={city}
                    onChange={(e)=>setCity(e.target.value)}
                    required
                  >
                  </Form.Control>
             </Form.Group>
             <Form.Group className="mb-3" controlId="postalcode">
                <Form.Label>Postal Code</Form.Label>
                  <Form.Control
                    value={postalcode}
                    onChange={(e)=>setPostalCode(e.target.value)}
                    required
                  >
                  </Form.Control>
             </Form.Group>
             <Form.Group className="mb-3" controlId="country">
                <Form.Label>Country</Form.Label>
                  <Form.Control
                    value={country}
                    onChange={(e)=>setCountry(e.target.value)}
                    required
                  >
                  </Form.Control>
             </Form.Group>
             <div className='mb-2'>
                 <Button variant="primary" type="submit">Continue</Button>
             </div>
        </Form>
        </div>
    </div>
  )
}
