import { Routes, Route } from "react-router-dom";

import './App.css'
import "bootstrap/dist/css/bootstrap.min.css";
import Navigationbar from './component/Navbar';
import Home from './pages/Home';
import MyTicket from './pages/MyTicket';
import { Payment } from "./pages/Payment";
import { AdminListTransactions } from "./pages/AdminListTransactions";
import { AddTicket } from "./pages/AddTicket";
import { MyTicketPending } from "./pages/MyTicketPending";
import Footer from "./component/Footer"
import { AdminApproveList } from "./pages/AdminApproveList";
import { UserContextProvider } from "./UserContext/UserContext";
import { useNavigate } from "react-router-dom";
import { API, setAuthToken } from "./config/api";
import React, { useContext, useEffect,useState } from "react";
import { UserContext } from "./UserContext/UserContext";




function App() {
  let navigate = useNavigate();
const [state, dispatch] = useContext(UserContext);
const [isLoading, setIsLoading] = useState(true)

useEffect(() => {
  // Redirect Auth but just when isLoading is false
  if (!isLoading) {
    if (state.isLogin === false) {
      navigate('/');
    }
  }
}, [isLoading]);

useEffect(() => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
    checkUser();
  } else {
    setIsLoading(false)
  }
}, []);

const checkUser = async () => {
  try {
    const response = await API.get('/check-auth');
    console.log("check user success : ", response)
    // Get user data
    let payload = response.data.data;
    // Get token from local storage
    payload.token = localStorage.token;
    // Send data to useContext
    dispatch({
      type: 'USER_SUCCESS',
      payload,
    });
    setIsLoading(false)
  } catch (error) {
    console.log("check user failed : ", error);
    dispatch({
      type: 'AUTH_ERROR',
    });
    setIsLoading(false)
  }
};
  return (
    <div className="App">
      <Navigationbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/myticketpending/:id" element={<MyTicketPending/>} />
        <Route path="/my-ticket" element={<MyTicketPending />} />
        <Route path="/payment/:id" element={<Payment />} />
        <Route path="/ListTransactions" element={<AdminListTransactions />} />
        <Route path="/AddTicket" element={<AddTicket />} />
        <Route path="/adminApprove" element={<AdminApproveList/>} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App; 
