import { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Account from "./pages/Account";
import Cart from "./pages/Cart";
import Favorite from "./pages/Favorite";
import Header from "./components/Header";
import Login from "./pages/Login";
import Payment from "./pages/Payment";
import Products from "./pages/Products";
import Register from "./pages/Register";
import "./App.css"

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotFound from "./pages/NotFound";


function App() {
  const [flag, setFlag] = useState(false);



  return (
    <div>
      <Header setFlag={setFlag} flag={flag} />

      <Routes>

        <Route path="/" exact element={<Products />} />
        <Route path="/cart" exact element={<Cart />} />
        <Route path="/favorite" exact element={<Favorite />} />
        <Route path="/payment" exact element={<Payment />} />
        <Route path="/register" exact element={<Register />} />
        <Route path="/login" exact element={<Login setFlag={setFlag} />} />
        <Route path="/account" exact element={<Account setFlag={setFlag} />} />
        <Route path='*' exact element={<NotFound/>} />

      </Routes>

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

    </div>
  );
}


export default App;


