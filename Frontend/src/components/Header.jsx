import React from 'react'
import { Link } from 'react-router-dom'
import logo from "../images/amazon-logo.png"
import Navbar from "react-bootstrap/Navbar"
import Container from "react-bootstrap/Container"
import {LinkContainer} from  "react-router-bootstrap"
import Badge from 'react-bootstrap/esm/Badge'
import Nav from "react-bootstrap/Nav"
import {useContext} from "react"
import {Store} from "../Store"
import NavDropdown from "react-bootstrap/NavDropdown"
import {useNavigate} from "react-router-dom"

export default function Header() {
  const {state,dispatch:cxtDispatch}=useContext(Store)
  const {cart,userInfo}=state

  const navigate=useNavigate()
  async function signoutHandler(){
    cxtDispatch({type:"USER_SIGNOUT"})
    localStorage.removeItem('userInfo')
    localStorage.removeItem('shippingAddress')
    localStorage.removeItem('paymentMethod')
    navigate("/")
  }
  return (
        <header>
        <Navbar>
           <Container>
             <LinkContainer to="/">
                 <Navbar.Brand>
            <img className="Amazon-logo" src={logo} alt="Amazon-Logo" width="60px" />
                      Aapki apni Dukaan
                 </Navbar.Brand>
             </LinkContainer>
             <Nav className="me-auto">
                 <Link to="/cart" className="nav-link">
                      Cart {
                        cart.cartItem.length>0 && <Badge pill bg="warning">
                          {cart.cartItem.length}
                        </Badge>
                      }
                 </Link> 
                 {
                   userInfo?
                   <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                       <LinkContainer to="/profile">
                         <NavDropdown.Item>User Profile</NavDropdown.Item>
                       </LinkContainer>
                       <LinkContainer to="/orderhistory">
                         <NavDropdown.Item>Order History</NavDropdown.Item>
                       </LinkContainer>
                       {/* <NavDropdown.Divider> */}
                         <Link
                         className='dropdown-item'
                         to="#signout"
                         onClick={signoutHandler}
                         >Sign out</Link>
                       {/* </NavDropdown.Divider> */}
                   </NavDropdown>
                   :
                     <Link className="nav-link" to="/signin">
                       Sign In
                      </Link>
                 }
             </Nav>
           </Container>
        </Navbar>
            <Link to="/" >
            </Link>
        </header>
  )
}
