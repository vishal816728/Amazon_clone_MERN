import react,{useEffect, useReducer,useState} from "react"
import {Helmet} from "react-helmet-async"
import {useContext} from "react"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Card from "react-bootstrap/Card"
import {Store} from "../Store"
import {Link} from "react-router-dom"
import { ListGroup,Button } from "react-bootstrap"
import {useNavigate} from "react-router-dom"
import axios from "axios"
import LoadingBox from "../components/LoadingBox"

const reducer=(state,action)=>{
    switch(action.type){
        case 'CREATE_REQUEST':
            return {...state,laoding:true}
        case 'CREATE_SUCCESS':
            return {...state,loading:false}
        case 'CREATE_FAIL':
            return {...state,loading:false}
        default:
            return state            
    }
}
function Placeorder(){
    const [{loading,error},dispatch]=useReducer(reducer,{
        loading:false,
        error:''
    })

    const {state,dispatch:cxtDispatch}=useContext(Store)
    const {cart,userInfo}=state
     const navigate=useNavigate()
     const [orders, setOrders] = useState([]);

  async function fetchOrders() {
    const { data } = await axios.get('/list-orders');
    setOrders(data);
  }
  useEffect(() => {
    fetchOrders();
  }, []);
     cart.itemPrice=cart.cartItem.reduce((a,b)=>a+b.quantity*b.price,0)
     cart.taxPrice=0
     cart.shippinngPrice=cart.itemPrice>500?0:20
     cart.totalPrice=cart.itemPrice+cart.taxPrice+cart.shippinngPrice


    const placeOrderHandler=async ()=>{
      try {
         const script=document.createElement('script')
         script.src='https://checkout.razorpay.com/v1/checkout.js'

         script.onerror = () => {
            alert('Razorpay SDK failed to load. Are you online?');
          };
          script.onload = async () => {
            try {
              
              const result = await axios.post('http://localhost:5000/create-order', {
                amount: cart.totalPrice+'00',
                currency:'INR'
              });
              const { amount, id: order_id, currency } = result.data;
              const {
                data: { key: razorpayKey },
              } = await axios.get('http://localhost:5000/get-razorpay-key');
              const options = {
                key: razorpayKey,
                amount: amount.toString(),
                currency: currency,
                name: 'example name',
                description: 'example transaction',
                order_id: order_id,
                handler: async function (response) {
                  const result = await axios.post('http://localhost:5000/pay-order', {
                    amount: amount,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpaySignature: response.razorpay_signature,
                  });
                  alert(result.data.msg);
                  fetchOrders();
                },
                prefill: {
                  name: cart.shippingAddress.fullName,
                  email: 'email@example.com',
                  contact: '111111',
                },
                notes: {
                  address: 'example address',
                },
                theme: {
                  color: '#80c0f0',
                },
              };
      
              
              const paymentObject = new window.Razorpay(options);
              paymentObject.open();
            } catch (err) {
              alert(err);
           
            }
          };
          document.body.appendChild(script);

      } catch (error) {
          dispatch({type:'CREATE_FAIL'})
          alert("something went wrong")
      }
    }
    useEffect(()=>{
        if(!cart.paymentMethod){
            navigate("/payment")
        }
    },[])
    return(
        <div>
            <Helmet>
                <title>Place Order</title>
            </Helmet>
            <h1 className="m-3">Place Order</h1>
            <Row className="m-2">
                <Col md={8}>
                    <Card>
                        <Card.Body>
                            <Card.Title>
                                Shipping
                            </Card.Title>
                            <Card.Text>
                                <strong>Name:{' '}</strong>{cart.shippingAddress.fullName}<br />
                                <strong>Address:{' '}</strong>{cart.shippingAddress.address}<br />
                                {cart.shippingAddress.city},{cart.shippingAddress.postalcode}
                                ,{cart.shippingAddress.country}
                            </Card.Text>
                            <Link to="/shipping">Edit</Link>
                        </Card.Body>
                    </Card>
                    <Card className="mb-3">
                          <Card.Body>
                              <Card.Title>
                                  Payment
                              </Card.Title>
                              <Card.Text>
                                  <strong>Method:{' '}</strong>{cart.paymentMethod}
                              </Card.Text>
                              <Link to="/payment">
                                Edit
                              </Link>
                          </Card.Body>
                    </Card>
                   
                </Col>
                <Col md={4}>
                     <Card>
                         <Card.Body>
                             <Card.Title>Order Summary</Card.Title>
                             <ListGroup variant="flush">
                                 <ListGroup.Item>
                                     <Row>
                                         <Col>Items</Col>
                                         <Col>Rs{' '}{cart.itemPrice}</Col>
                                     </Row>
                                 </ListGroup.Item>
                                 <ListGroup.Item
                                 >
                                     <Row>
                                         <Col>Shipping</Col>
                                         <Col>Rs{' '}{cart.shippinngPrice}</Col>
                                     </Row>
                                 </ListGroup.Item>
                                 <ListGroup.Item
                                 >
                                     <Row>
                                         <Col>Text-Price</Col>
                                         <Col>Rs{' '}{cart.taxPrice}</Col>
                                     </Row>
                                 </ListGroup.Item>
                                 <ListGroup.Item
                                 >
                                     <Row>
                                         <strong><Col>Order Total</Col></strong>
                                         <Col>Rs{' '}{cart.totalPrice}</Col>
                                     </Row>
                                 </ListGroup.Item>
                                 <ListGroup.Item
                                 >
                                     <div className="d-grid">
                                         <Button
                                         type="Button"
                                         onClick={placeOrderHandler}
                                         disabled={cart.cartItem.length===0}
                                         >Place Order
                                         </Button>
                                         {loading && <LoadingBox />}
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

export default Placeorder