import React, { useContext } from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import {useEffect,useReducer} from "react"
import axios from "axios"
import Col from 'react-bootstrap/esm/Col'
import Row from "react-bootstrap/Row"
import ListGroup from "react-bootstrap/ListGroup"
import Rating from '../components/Rating'
import Card from "react-bootstrap/Card"
import ListGroupItem from 'react-bootstrap/esm/ListGroupItem'
import Badge from "react-bootstrap/Badge"
import Button from 'react-bootstrap/esm/Button'
import {Helmet} from "react-helmet-async"
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { Store } from '../Store'


const reducer=(state,action)=>{
  switch (action.type){
    case 'FETCH_REQUEST':
      return {...state,loading:true};
    case 'FETCH_SUCCESS':
      return {...state,product:action.payload,loading:false}
    case 'FETCH_FAIL':
      return {...state,loading:false,error:action.payload}
    default:
      return state;      
  }
}

export default function ProductScreen() {
  const navigate=useNavigate()
    const params=useParams()
    const {slug}=params
    console.log(slug)
    const [{loading,error,product},dispatch]=useReducer(reducer,{
      product:[],
      loading:true,
      error:'',
    })

  
    useEffect(()=>{
            dispatch({type:'FETCH_REQUEST'})
            try {
                 axios.get(`http://localhost:5000/api/products/slug/${slug}`).then(response=>{
  
                dispatch({type:'FETCH_SUCCESS',payload:response.data})
              }).catch(err=>{
                console.log(err)
                dispatch({type:'FETCH_FAIL',payload:err.message})
              })
            } catch (error) {
              dispatch({type:'FETCH_FAIL',payload:error.message})
            }
             
    },[slug])
     
    const {state,dispatch:cxtDispatch}=useContext(Store)
    const {cart}=state
    const addToCart=async ()=>{
           const existItem=cart.cartItem.find(x=>x._id===product._id)
           const quantity=existItem?existItem.quantity+1:1
           const {data}=await axios.get(`http://localhost:5000/api/products/${product._id}`)
           if(data.countInStock<quantity){
             window.alert("sorry. product is out of stock")
           }
           cxtDispatch({type:'CART_ADD_ITEM',payload:{...product,quantity:quantity}})
           navigate("/cart")
    }
  return (
    <div>
    {
    loading?
    <LoadingBox />:error?<MessageBox variant="danger">{error}</MessageBox>:
    <Row>
      <Col md={6}>
        <img className='img-large'
        src={product.image}
        alt={product.name}
        />

      </Col>
      <Col md={3}>
         <ListGroup variant="flush">
           <ListGroupItem>
           <Helmet><title>{product.name}</title></Helmet>
              <h1>
              {product.name}
              </h1>
           </ListGroupItem>
           <ListGroup>
             <Rating rating={product.rating} numReviews={product.numReviews} />
           </ListGroup>
           <ListGroupItem>
             Price:&nbsp;{product.price}&nbsp;Rs
           </ListGroupItem>
           <ListGroupItem>
             Description:<br/>
              <p>{product.description}</p>
           </ListGroupItem>
         </ListGroup>
      </Col>
      <Col md={3}>
        <Card>
          <Card.Body>
            <ListGroup variant="flush">
            <ListGroupItem>
               <Row>
                 <Col>
                   Price:
                 </Col>
                 <Col>{product.price}&nbsp;Rs</Col>
               </Row>
               </ListGroupItem>
               <ListGroupItem>
                 <Row>
                   <Col>
                     Status:
                   </Col>
                   <Col>
                     {product.countInStock>0?<Badge bg="success">In Stock</Badge>:<Badge bg="danger">unavailable</Badge>}
                   </Col>
                   {/* <Col> */}
                    {product.countInStock>0?
                     <Button onClick={addToCart} style={{marginTop:"1rem"}} className="btn-primary">Add to Cart</Button>:
                     ""
                    }
                 </Row>
               </ListGroupItem>
            </ListGroup>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  }
  </div>
  )
}
