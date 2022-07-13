import React,{useContext} from 'react'
import Container from 'react-bootstrap/esm/Container'
import { Helmet } from 'react-helmet-async'
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import {Link, useLocation, useNavigate} from "react-router-dom"
import { useState,useEffect } from 'react'
import axios from "axios"
import {Store} from "../Store"

export default function SignupScreen() {
    const [name,setName]=useState()
    const [email,setEmail]=useState()
    const [password,setPassword]=useState()
    const [confirmPassword,setConfirmPassword]=useState()
    
    const navigate=useNavigate()
    const {search}=useLocation()
    const redirectInUrl=new URLSearchParams(search).get('redirect')
    const redirect=redirectInUrl?redirectInUrl:'/'
    
    const {state,dispatch:cxtDispatch}=useContext(Store)
    const submitHandler=async(e)=>{
          e.preventDefault()
          if(password!==confirmPassword){
              alert("password do not match")
              return
          }
          try{
                const {data}=await axios.post('http://localhost:5000/api/user/signup',{
                    name,
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
            <title>Sign up</title>
        </Helmet>
        <h1 className='my-3'>Sign up</h1>
        <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" required onChange={(e)=>setName(e.target.value)} >

                  </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" required onChange={(e)=>setEmail(e.target.value)} >

                  </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="password" >
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" required onChange={(e)=>setPassword(e.target.value)} >

                  </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="confirmPassword" >
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control type="password" required onChange={(e)=>setConfirmPassword(e.target.value)} >

                  </Form.Control>
            </Form.Group>
            <div className='mb-3'>
                <Button type="submit">Sign Up</Button>
            </div>
            <div className="mb-3">
                Already Have an account?{' '}
                <Link to={`/signin?redirect=${redirect}`}>
                   Sign In Here
                </Link>
            </div>
        </Form>
    </Container>
  )
}
