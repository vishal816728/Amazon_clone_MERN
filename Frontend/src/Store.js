import React from 'react'
import { createContext,useReducer } from 'react'

export const Store=createContext()

const initialState={
    userInfo:localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')):[],
    cart:{
      shippingAddress:localStorage.getItem('shippingAddress')?JSON.parse(localStorage.getItem('shippingAddress')):{},
        cartItem:[]
    }
}

function reducer(state,action){
       
      switch(action.type){
          case "CART_ADD_ITEM":
               const newItem=action.payload;
               const existItem=state.cart.cartItem.find(item=>item._id===newItem._id)
               const cartItem=existItem?state.cart.cartItem.map((item)=>item._id===existItem._id?newItem:item):[...state.cart.cartItem,newItem]
            //    localStorage.setItem('cartItem',JSON.stringify(cartItem))
               return {...state,cart:{...state.cart,cartItem}}        
          case 'CART_REMOVE_ITEM': {
                const cartItems = state.cart.cartItem.filter(
                  (item) => item._id!==action.payload._id
                );
                return { ...state, cart: { ...state.cart, cartItems } };
              }
           case 'USER_SIGNIN':
             return {...state,userInfo:action.payload}

           case 'USER_SIGNOUT':
             return {...state,userInfo:null,cart:{cartItem:[],shippingAddress:{},paymentMethod:''}}  
           case 'SAVE_SHIPPING_ADDRESS':
             return {
               ...state,
               cart:{
                  ...state.cart,
                  shippingAddress:action.payload
               }
             }
             case 'SAVE_PAYMENT_METHOD':     
             return {
              ...state,
              cart:{
                 ...state.cart,
                 paymentMethod:action.payload
              }
            }

            case 'CART_CLEAR':
              return {...state,cart:{...state.cart,cartItem:[]}}
          default:
               return state
      }
}

export function StoreProvider(props) {
    const [state,dispatch]=useReducer(reducer,initialState)
    const value={state,dispatch}
  return (
    <Store.Provider value={value}>
           {props.children}
    </Store.Provider>
  )
}
