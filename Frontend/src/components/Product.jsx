import React, { useContext } from 'react'
import {Link } from "react-router-dom"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import Rating from './Rating'
import axios from "axios"
import { Store } from '../Store'

export default function Product({product}) {
  const {state,dispatch:cxtDispatch}=useContext(Store)
  const {cart:{
      cartItem
  }}=state
  console.log(state)
  const updateclickhandler=async (item)=>{
    const existItem=cartItem.find(x=>x._id===product._id)
    const quantity=existItem?existItem.quantity+1:1
    const {data}=await axios.get(`http://localhost:5000/api/products/${item._id}`)
    if(data.countInStock<quantity){
       window.alert("sorry. product is out of stock")
     }
     cxtDispatch({type:'CART_ADD_ITEM',payload:{...item,quantity:quantity}})
}

  return (
    <Card key={product.slug} >

            <Link to={`/product/${product.slug}`} >
             <img src={product.image} className="card-img-top" alt="Product-image" />
            </Link> 
            <Card.Body>
             <div className="product-info">
             <Link to={`/product/${product.slug}`} >
               <Card.Title>{product.name}</Card.Title>
              </Link>
              <Card.Text> 
               <p>original price:&nbsp;<small style={{textDecoration: "line-through"}}>{product.originalprice}</small></p>
               <p>{product.price}&nbsp;Rs.</p>
               <Rating rating={product.rating} numReviews={product.numReviews}/>
               </Card.Text>
               {
                 product.countInStock===0?<Button variant="light" disabled>Out of stock</Button>:
               <Button onClick={()=>updateclickhandler(product)} >Add to Cart</Button>
               }
             </div>
             </Card.Body>
          </Card>
  )
}
