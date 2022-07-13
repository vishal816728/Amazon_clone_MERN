import React,{useContext} from 'react'
import Container from 'react-bootstrap/esm/Container'
import { Helmet } from 'react-helmet-async'
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import {Link, useLocation, useNavigate} from "react-router-dom"
import { useState,useEffect } from 'react'
import axios from "axios"
import {Store} from "../Store"

export default function SigninScreen() {
    const [email,setEmail]=useState()
    const [password,setPassword]=useState()
    
    const navigate=useNavigate()
    const {search}=useLocation()
    const redirectInUrl=new URLSearchParams(search).get('redirect')
    const redirect=redirectInUrl?redirectInUrl:'/'
    
    const {state,dispatch:cxtDispatch}=useContext(Store)
    const submitHandler=async(e)=>{
          e.preventDefault()
          try{
                const {data}=await axios.post('http://localhost:5000/api/user/signin',{
                    email,
                    password
                })
                localStorage.setItem('userInfo',JSON.stringify(data))
                cxtDispatch({type:"USER_SIGNIN",payload:data})
                navigate(redirect || "/")
          }catch(err){
              alert("invalid")
               console.log(err) 
          }
    }
  return (
    <Container className="small-container">
        <Helmet>
            <title>Sign In</title>
        </Helmet>
        <h1 className='my-3'>Sign In</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3"controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" required onChange={(e)=>setEmail(e.target.value)} >

                  </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3"controlId="password" >
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" required  onChange={(e)=>setPassword(e.target.value)} >

                  </Form.Control>
            </Form.Group>
            <div className='mb-3'>
                <Button type="submit">Sign In</Button>
            </div>
            <div className="mb-3">
                New Customer?{' '}
                <Link to={`/signup?redirect=${redirect}`}>
                   Sign up Here
                </Link>
            </div>
        </Form>
    </Container>
  )
}
