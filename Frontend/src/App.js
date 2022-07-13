
import {BrowserRouter as Router,Routes,Route, BrowserRouter} from "react-router-dom"
import Footer from "./components/Footer";
import Header from "./components/Header";
import Homepage from "./pages/Homepage";
import ProductScreen from "./pages/ProductScreen";
import Cart from "./pages/Cart";
import SigninScreen from "./pages/SigninScreen";
import ShippingAddressScreen from "./pages/ShippingAddressScreen";
import SignupScreen from "./pages/SignupScreen";
import PaymentmethodScreen from "./pages/PaymentmethodScreen";
import Placeorder from "./pages/Placeorder";

function App() {
  // :then parameter to define the route based on the product
  return (
    <BrowserRouter>
    <Header />
    <Routes>
    <Route path="/" element={<Homepage />}></Route>
    <Route path="/product/:slug" element={<ProductScreen />} ></Route>
    <Route path="/cart" element={<Cart />}></Route>
    <Route path="/signin" element={<SigninScreen />}></Route>
    <Route path="/shipping" element={<ShippingAddressScreen />}></Route>
    <Route path="/signup" element={<SignupScreen/>} ></Route>
    <Route path="/payment" element={<PaymentmethodScreen />}></Route>
    <Route path="/placeorder" element={<Placeorder />}></Route>
    </Routes>
    <Footer />
    </BrowserRouter>
  );
}

export default App;
