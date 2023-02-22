import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './css/Login.css';
import { toast } from 'react-toastify';
import { Modal, ModalBody } from 'reactstrap';
import { FaCheck } from 'react-icons/fa';
import { baseURL } from '../data/Urls'


const Login = ({ setFlag }) => {

    const initialValues = { email: "", password: "" };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({ initial: "" });
    const [modal, setModal] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem("user");
        if (auth) {
            navigate("/")
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
    };

    useEffect(() => {

        if (Object.keys(formErrors).length === 0) {
            callAxios(formValues);
        }
    }, [formErrors]);

    const callAxios = async (formValues) => {

        await axios.post(baseURL+"/api/Account/login", formValues)
            .then((result) => {

                if (result.status == 200) {

                    let account = { userName: result.data.userName, email: result.data.email }
                    localStorage.setItem("user", JSON.stringify(account));
                    setModal(true);
                    setFlag(true);
                    setTimeout(() => { navigate("/"); }, 2000);
                }
            })
            .catch((error) => {
                toast.error(error.response.data , { position: "top-center", autoClose: "20000" });
            });
    }


    const validate = (values) => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

        if (!values.email) {
            errors.email = "Email is required!";
        } else if (!regex.test(values.email)) {
            errors.email = "This is not a valid email format!";
        }
        if (!values.password) {
            errors.password = "Password is required";
        }
        return errors;
    };



    return (

        <div style={{ backgroundColor: "#cdcdcd" }}>

            <div className="logincontainer">

                <form className='loginform' onSubmit={handleSubmit}>
                    <h1>Login Form</h1>
                    <div className="ui divider"></div>
                    <div className="ui form">

                        <div className="field">
                            <label>Email</label>
                            <input
                                type="text"
                                name="email"
                                placeholder="Email"
                                value={formValues.email}
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                        <p className='warning' >{formErrors.email}</p>

                        <div className="field">
                            <label>Password</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formValues.password}
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                        <p className='warning'>{formErrors.password}</p>
                        <button className="fluid ui button blue">Submit</button>

                        <div className='createaccount'>
                            <label>Not registered? </label>
                            <Link to="/Register" style={{ marginLeft: "5px" }}>Create an account</Link>
                        </div>

                    </div>
                </form>
            </div>

            <Modal isOpen={modal} centered fade >
                <ModalBody style={{ color: "green", textAlign: "center" }}>
                    Logged in Successfully <FaCheck />
                </ModalBody>
            </Modal>
        </div>
    );
}

export default Login;
