import React, { useEffect, useState } from 'react';
import "./css/Cart.css"
import axios from 'axios';
import { GrCart } from 'react-icons/gr';
import { useNavigate } from 'react-router-dom';
import { MdOutlinePayments } from 'react-icons/md';
import { FaArrowCircleRight } from 'react-icons/fa';
import { TiArrowBack } from "react-icons/ti";
import { baseURL } from '../data/Urls'

const Cart = () => {

    const [data, setData] = useState([]);

    const totalPrice = data ? data.reduce((price, item) => price + item.quantity * item.price, 0) : 0;

    const navigate = useNavigate();


    useEffect(() => {

        if (!localStorage.getItem('user')) {
            navigate("/login");
            return;
        }

        axios.get(baseURL+"/api/Cart/GetCartList")
            .then((result) => { setData(result.data); })
            .catch((error) => console.log(error));

    }, []);

    const deleteProduct = (id) => {

        axios.delete(baseURL+`/api/Cart/${id}`)
            .then((result) => {
                setData(data.filter(item => item.id !== id))
            })
            .catch((error) => console.log(error));
    }


    const handlePlus = async (item) => {
        const bookExist = data.find((book) => book.id === item.id);
        if (bookExist) {

            setData(data.map((book) => book.id === item.id ? { ...bookExist, quantity: bookExist.quantity + 1 } : book));
            axios.put(baseURL+"/api/Cart/UpdateQuantity", { ...bookExist, quantity: bookExist.quantity + 1 })
                .then((result) => {

                })
                .catch((error) => console.log(error));

        }

    }

    const handleMinus = (item) => {

        const bookExist = data.find((book) => book.id === item.id);
        if (bookExist.quantity === 1) {
            setData(data.filter((book) => book.id !== item.id));
            deleteProduct(item.id);

        }
        else {
            setData(data.map((book) =>
                book.id === item.id
                    ? { ...bookExist, quantity: bookExist.quantity - 1 }
                    : book
            )
            );
            axios.put(baseURL+"/api/Cart/UpdateQuantity", { ...bookExist, quantity: bookExist.quantity - 1 })
                .then((result) => {

                })
                .catch((error) => console.log(error));

        }

    }


    const handleGoPayment = () => {

        let user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
            navigate("/login");
        }
        else {
            navigate("/payment");
        }

    }

    return (
        <div className='cartpage'>

            <div className="cartpage-header">Your Cart <GrCart style={{ marginLeft: "15px", fontSize: "25px" }} /> </div>


            <div style={{ display: "flex" }}>

                <div className="itemlist" style={{ width: "70%" }}>

                    <div id='itemlist'>
                        {data && data.length > 0 ?

                            data.map((item) =>
                            (
                                <div key={item.id} className='cart hvr-forward'>

                                    <img className='cart-image' src={item.image} alt="photo" />

                                    <div style={{ display: "flex", flexDirection: "column" }}>
                                        <h3 className='cart-name'>{item.name}</h3>

                                        <div className='cart-price'>
                                            $ {item.price}
                                        </div>
                                    </div>

                                    <div className='cart-function '>
                                        <button className='cart-add-button hvr-glow-btn' onClick={() => handlePlus(item)}>+</button>
                                        <div className='amount-text'>{item.quantity}</div>
                                        <button className='cart-remove-button hvr-glow-btn' onClick={() => handleMinus(item)}>-</button>
                                    </div>

                                    <div className='sum-price'>
                                        Total : {item.quantity * item.price}
                                    </div>
                                </div>
                            )

                            )
                            :
                            (
                                <div style={{ display: "flex", width: "100%" }}>
                                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%", height: "50vh" }}>
                                        <img style={{ objectFit: "scale-down", width: "30%", height: "28%" }} src={require('../data/cartempty.png')} />
                                        <h1 style={{ opacity: "0.6", fontStyle: "bold", textAlign: "center", fontSize: "25px" }}>Your Cart is Empty</h1>

                                    </div>
                                </div>

                            )
                        }
                    </div>
                </div>



                {data && data.length > 0 ?

                    <div style={{ height: "300px", width: "30%", display: "flex" }}>

                        <div className='order-card' >
                            <h3 className="order-card-name" style={{ height: "20%", color: "white", textAlign: "center", fontSize: "25px", borderBottom: "1px solid grey" }}>Order Summary <MdOutlinePayments style={{ marginLeft: "15px" }} /></h3>

                            <div className='total-price'>
                                Total Price   :
                                <span >$ {totalPrice}</span>
                            </div>


                            <div >
                                <button className="cart-payment-button hvr-sweep-to-right" onClick={() => handleGoPayment()}>Go To Payment <FaArrowCircleRight className='icon' /></button>
                            </div>



                        </div>
                    </div>
                    :

                    <a style={{ textDecoration: "none", color: "black" }} href="/">  <button href="/" className="btn-goback" style={{ width: "200px", height: "50px", marginTop: "160px", borderRadius: "20px" }}> Go Back To Shop <TiArrowBack style={{ fontSize: "20px" }} /></button></a>
                }

            </div>

        </div>
    )
}

export default Cart;

