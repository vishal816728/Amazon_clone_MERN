import React from 'react'
import {useContext} from "react"
import { Helmet } from 'react-helmet-async'
import {Store} from "../Store"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import MessageBox from '../components/MessageBox'
import ListGroupItem from 'react-bootstrap/esm/ListGroupItem'
import ListGroup from "react-bootstrap/ListGroup"
import {Link} from "react-router-dom"
import Button from 'react-bootstrap/esm/Button'
import Card from 'react-bootstrap/esm/Card'
import axios from 'axios'

export default function Cart() {
    const {state,dispatch:cxtDispatch}=useContext(Store)
    const {cart:{
        cartItem
    }}=state
    console.log(state)

    const updateclickhandler=async (item,quantity)=>{
        
         const {data}=await axios.get(`http://localhost:5000/api/products/${item._id}`)
         if(data.countInStock<quantity){
            window.alert("sorry. product is out of stock")
          }
          cxtDispatch({type:'CART_ADD_ITEM',payload:{...item,quantity:quantity}})
    }

    const removecarthandler=item=>{
        cxtDispatch({type:'CART_REMOVE_ITEM',payload:{...item}})
    }
  return (
    <div>
       <Helmet>
           <title>Shopping cart</title>
       </Helmet>
       <h1>Shopping Cart</h1>
       <Row>
           <Col md={8}>
                {
                    cartItem.length===0?
                    <MessageBox>
                        Cart is Empty <Link to="/">Shop Now</Link>
                    </MessageBox>:
                    (<ListGroup>
                        {cartItem?
                            cartItem.map((item)=>
                                <ListGroupItem key={item._id}>
                                    <Row className="align-items-center">
                                          <Col md={4}>
                                              <img src={item.image}
                                              alt={item.name}
                                              className="img-fluid rounded img-thumbnail"/>
                                              <Link to={`/product/${item.slug}`}>{item.name}</Link>
                                          </Col>
                                          <Col md={3}>
                                             <Button onClick={()=>updateclickhandler(item,(item.quantity-1))} variant="light" disable={item.quantity===1}>-</Button> 
                                             <span>{item.quantity}</span>{' '}
                                             <Button onClick={()=>updateclickhandler(item,(item.quantity+1))} variant="light" disable={item.quantity===item.countInStock}>+</Button>
                                          </Col>
                                          <Col md={3}>
                                              {item.price}
                                          </Col>
                                          <Col md={2}>
                                              <Button onClick={()=>removecarthandler(item)} variant="light">Delete</Button>
                                          </Col>
                                    </Row>
                                </ListGroupItem>)
                                :""
                        }
                    </ListGroup>)
                }
           </Col>
           <Col md={4}>
              <Card>
                  <Card.Body>
                      <ListGroup variant="flush">
                             <ListGroup.Item>
                                 <h3>
                                     SubTotal ({cartItem.reduce((a,c)=>a+c.quantity,0)}
                                     )items: Rs 
                                     {
                                         cartItem.reduce((a,c)=>a+c.price*c.quantity,0)
                                     }
                                 </h3>
                             </ListGroup.Item>
                             <ListGroup.Item>
                                 <div className='d-grid'>
                                 <Link to="/signin?redirect=/shipping">
                                     <Button variant="primary" disabled={cartItem.length===0}>Proceed to checkout</Button>
                                 </Link>    
                                 </div>
                             </ListGroup.Item>
                      </ListGroup>

                  </Card.Body>
              </Card>
           </Col>
       </Row>
     </div>
  )
}
