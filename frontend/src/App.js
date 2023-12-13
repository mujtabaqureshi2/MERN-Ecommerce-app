import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomeScreen from "./Screens/HomeScreen";
import Header from "./components/header";
import Footer from "./components/footer";
import { Container } from "react-bootstrap";
import ProductScreen from "./Screens/ProductScreen"; // Import your ProductScreen component
import CartScreen from "./Screens/CartScreen";
import LoginScreen from "./Screens/loginScreen";
import RegisterScreen from "./Screens/RegisterScreen";
import ProfileScreen from "./Screens/ProfileScreen";
import ShippingScreen from "./Screens/ShippingScreen";
import PaymentScreen from "./Screens/PaymentScreen";
import PlaceOrderScreen from "./Screens/PlaceOrderScreen";
import OrderScreen from "./Screens/orderScreen";
import UserListScreen from "./Screens/UserListScreen";
import UserEditScreen from "./Screens/UserEditScreen";
import ProductListScreen from "./Screens/ProductListScreen";
import ProductEditScreen from "./Screens/ProductEditScreen";
import OrdersListScreen from "./Screens/OrdersListScreen";
const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
          <Route path="/login/shipping" element={<ShippingScreen />}/>
          <Route path="/login" element={<LoginScreen />}/>
          <Route path="/profile" element={<ProfileScreen />}/>
          <Route path="/payment" element={<PaymentScreen />}/>
          <Route path="/order/:id" element={<OrderScreen />}/>
          <Route path="/placeOrder" element={<PlaceOrderScreen />}/>

          <Route path="/register" element={<RegisterScreen />}/>
            <Route path="/search/:keyword" element={<HomeScreen />}/>
            <Route path="/page/:pageNumber" element={<HomeScreen />} exact />
            <Route path="/search/:keyword/page/:pageNumber" element={<HomeScreen />}/>
            <Route path="/" element={<HomeScreen />} exact />
            
            <Route path="/product/:id" element={<ProductScreen />}/>
            <Route path="/cart/:id?" element={<CartScreen/>}/>
            <Route path="/admin/userList" element={<UserListScreen />}/>
            <Route path="/admin/orderList" element={<OrdersListScreen />}/>
            <Route path="/admin/productList/:pageNumber" element={<ProductListScreen />} exact/>
            <Route path="/admin/productList" element={<ProductListScreen />}/>
            <Route path="/admin/User/:id/edit" element={<UserEditScreen />}/>
            <Route path="/admin/product/:id/edit" element={<ProductEditScreen />}/>
          </Routes>
        </Container>
      </main>
      <Footer />   
    </Router>
  );
};

export default App;
 