import React,{ useState,useEffect, useReducer } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios"
import Container from 'react-bootstrap/esm/Container';
import Col from "react-bootstrap/Col"
import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import {Helmet} from "react-helmet-async"

const reducer=(state,action)=>{
      switch (action.type){
        case 'FETCH_REQUEST':
          return {...state,loading:true};
        case 'FETCH_SUCCESS':
          return {...state,products:action.payload,loading:false}
        case 'FETCH_FAIL':
          return {...state,loading:false,error:action.payload}
        default:
          return state;      
      }
}

export default function Homepage() {
  const [{loading,error,products},dispatch]=useReducer(reducer,{
    products:[],
    loading:true,
    error:'',
  })
  // const [productData,setProductData]=useState()

  useEffect(()=>{
          dispatch({type:'FETCH_REQUEST'})
          try {
               axios.get("http://localhost:5000/api/products").then(response=>{

              dispatch({type:'FETCH_SUCCESS',payload:response.data})
              // setProductData(response)
            }).catch(err=>{
              console.log(err)
              dispatch({type:'FETCH_FAIL',payload:err.message})
            })
          } catch (error) {
            dispatch({type:'FETCH_FAIL',payload:error.message})
          }
           
  },[])
  console.log(products)
  return (
    <main>
    <Helmet>
      <title>Amazon</title>
    </Helmet>
    <Container>
    <h1>Latest Arrivals</h1>
    <div className="products">
      {products?
        loading?<LoadingBox />:error?
        <MessageBox variant="danger">{error}</MessageBox>:
        products.map(product=>
        (
          <Col key={product.slug} sm={6} md={4} lg={3} className="mb-3">
             <Product product={product} />
        </Col>)):""
      }
      </div>    
      </Container>
 </main>
  )
}
