import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./css/Account.css"
import { Button, Card, Input, Modal, ModalBody } from 'reactstrap';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { IoMdPerson } from 'react-icons/io';
import { GrMail } from 'react-icons/gr';
import { FaCheck, FaUserCircle } from 'react-icons/fa';
import { IoMdExit } from 'react-icons/io'
import { toast } from 'react-toastify';
import { baseURL } from '../data/Urls'


const Account = ({ setFlag }) => {

    const [user, setUser] = useState("");
    const [modal, setModal] = useState(false);
    const navigate = useNavigate();
     

    useEffect(() => {

        if (localStorage.getItem('user')) {

            let { email } = JSON.parse(localStorage.getItem('user'));
            axios.get(baseURL+`/api/Account/GetUserInfo?email=${email}`)
                .then((result) => {
                    if (result.status === 200) {
                        setUser(result.data);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        else {
            navigate("/login");
        }

    }, []);


    const Logout = async () => {

       await axios.get(baseURL+"/api/Account/logout")
            .then((result) => {
                if (result.status === 200) {
                    localStorage.removeItem('user');
                    setUser("");
                    setModal(true);
                    setFlag(false);
                    setTimeout(() => { navigate("/"); }, 2000);
                }
            }
            )
            .catch((error) => {
                toast.error(error.response.data);
            });

    }

    return (

        <div style={{ height: "100vh", backgroundColor: "#cdcdcd" }} >

            <div style={{ display: 'flex', justifyContent: "center" }}>
                <Card style={{ borderRadius: "20px", border: "none", width: '300px', height: "450px", backgroundColor: "#573280" }}>


                    <div style={{ display: 'flex', justifyContent: "center", marginTop: "4px" }}>
                        <FaUserCircle style={{ fontSize: '50px', justifyContent: "center", color: "white" }} />
                    </div>
                    <h3 style={{ textAlign: "center", color: "white" }}>My Account</h3>
                    <hr style={{ margin: "0px", padding: "0px", alignSelf: "center", width: "100%", borderBottom: "1px solid white" }} />


                    <div style={{ display: "flex", alignItems: "center" }}>
                        <IoMdPerson style={{ color: "white", fontSize: "20px", marginRight: "5px" }} />
                        <Input
                            disabled
                            value={user ? user.firstName + " " + user.lastName :""}
                        />
                    </div>

                    <div style={{ display: "flex", alignItems: "center" }}>
                        <BsFillTelephoneFill style={{ color: "white", fontSize: "18px", marginRight: "5px" }} />
                        <Input
                            disabled
                            value={user ? user.telephone : ""}

                        />
                    </div>

                    <div style={{ display: "flex", alignItems: "center" }}>
                        <GrMail style={{ color: "white", fontSize: "18px", marginRight: "5px" }} />
                        <Input
                            disabled
                            value={user ? user.email:""}

                        />
                    </div>
                    <div >
                        <Button className='btn-exit' style={{ backgroundColor: "#696eff", width: "100%" }} onClick={()=>Logout()}>
                            Log Out  <IoMdExit style={{ fontSize: "medium", marginLeft: "10px" }} />
                        </Button>
                    </div>


                </Card>


                <Modal isOpen={modal} centered fade  >
                    <ModalBody style={{ color: "green", textAlign: "center" }}>
                        Logged Out Successfully <FaCheck />
                    </ModalBody>
                </Modal>


            </div>
        </div>
    )
}

export default Account;
