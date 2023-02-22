import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./css/Header.css";
import { Icon, Popup, Menu, Grid } from 'semantic-ui-react';
import { ImEnter } from 'react-icons/im';
import { FaShoppingCart } from 'react-icons/fa';
import axios from 'axios';
import { toast } from "react-toastify";
import { baseURL } from '../data/Urls'



const Header = ({ setFlag, flag }) => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {

        if (localStorage.getItem('user')) {
            setFlag(true);
        }

    }, [flag]);

    const Logout = async () => {

        await axios.get(baseURL+"/api/Account/logout")
             .then((result) => {
                 if (result.status === 200) {
                     localStorage.removeItem('user');
                     setFlag(false);
                     navigate("/");
                 }
             }
             )
             .catch((error) => {
                 toast.error(error.response.data);
             });
 
     }

    return (
        <header className="header">

            <div>
                <h1>
                    <Link to="/" className="logo">Book Shop </Link>
                </h1>
            </div>

            <div className="header-icons">

                <div>
                    <Link to="/">Home</Link>
                </div>

                <div>

                    {flag ? (
                        <Popup
                            pointing="true"
                            on="click"
                            position="bottom center"
                            trigger={<Icon  name="user circle" size="large" />}
                            open={isOpen}
                            onOpen={() => setIsOpen(true)}
                            onClose={() => setIsOpen(false)}
                        >
                            <Grid>
                                <Menu fluid vertical>
                                    <Menu.Item onClick={() => setIsOpen(false)}>
                                        <Link to="/account" style={{ textDecoration: "none", color: "black" }} >  My Profile <Icon name="user" /> </Link>
                                    </Menu.Item>

                                    
                                    <Menu.Item onClick={() => {setIsOpen(false);Logout();}}>
                                     Log out <Icon name="sign out" /> 
                                    </Menu.Item>
                                   
                                </Menu>
                            </Grid>
                        </Popup>) : <Link to="/login"> <ImEnter /> </Link>}

                </div>

                <div>

                    <Link to="/favorite" >
                        <Icon name="heart" size="large" />
                    </Link>

                </div>

                <div>
                    <Link  to="/cart">
                        <FaShoppingCart style={{ fontSize: "28px" }} />
                    </Link>
                </div>

            </div>
        </header >
    );
};

export default Header;
