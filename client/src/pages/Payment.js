import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "./css/Payment.css"
import axios from 'axios';
import { Button, FormGroup, Input, Label, Form, Col, Row, FormFeedback, Modal, ModalBody } from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown } from 'semantic-ui-react';
import { HiShoppingBag } from 'react-icons/hi';
import { FaCheck } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Card from "react-credit-cards";
import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate
} from "../utils/check.js";
import "react-credit-cards/es/styles-compiled.css";
import { baseURL } from '../data/Urls'

const Payment = () => {

  const [cityoptions, setCityoptions] = useState([]);
  const [townoptions, setTownoptions] = useState("");
  const initialValues = { addressText: "", cityId: null, townId: null, zip: "", name: "", number: "", expiry: "", cvc: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({ initial: "" });
  const [user, setUser] = useState("");
  const [totalprice, setTotalprice] = useState(0);
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();

  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [focused, setFocused] = useState("");


  const handleInputFocus = ({ target }) => {
    setFocused(target.name);
  };

  const handleInputChange = ({ target }) => {

    if (target.name === "number") {
      target.value = formatCreditCardNumber(target.value);
      setFormValues({ ...formValues, [target.name]: target.value });
      setNumber(target.value);
    }
    else if (target.name === "expiry") {
      target.value = formatExpirationDate(target.value);
      setFormValues({ ...formValues, [target.name]: target.value });
      setExpiry(target.value);
    }
    else if (target.name === "cvc") {
      target.value = formatCVC(target.value);
      setFormValues({ ...formValues, [target.name]: target.value });
      setCvc(target.value);
    }
    else if (target.name === "name") {
      setFormValues({ ...formValues, [target.name]: target.value });
      setName(target.value);
    }
    else {
      setFormValues({ ...formValues, [target.name]: target.value });
    }
  };

  const handleCityDropdown = async (e, { name, value }) => {

    setFormValues({ ...formValues, [name]: value });

    if (value) {

      await axios.get(baseURL+`/api/Address/GetTownList?id=${value}`)
        .then((result) => {
          if (result.status === 200) {
            setTownoptions(result.data.map((town) => ({ text: town.name, value: town.id })));
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }

  }

  const handleTownDropdown = (e, { name, value }) => {
    setFormValues({ ...formValues, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (totalprice > 0) {
      setFormErrors(validate(formValues));
    }
    else {
      toast.error("You can not complete your payment with $0 ");
    }
  }

  useEffect(() => {

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


    axios.get(baseURL+"/api/Address/GetCityList")
      .then((result) => {
        if (result.status === 200) {
          setCityoptions(result.data.map((city) => ({ key: city.id, text: city.name, value: city.id })));
        }

      })
      .catch((error) => {
        console.log(error);
      });


    axios.get(baseURL+"/api/Payment/GetPaymentTotal")
      .then((result) => {
        setTotalprice(result.data);
      })
      .catch((error) => {
        toast.error(error.message);
      });


  }, []);

  useEffect(() => {

    if (Object.keys(formErrors).length === 0 && totalprice > 0) {
      callAxios(formValues);
    }
  }, [formErrors]);

  const callAxios = async (formValues) => {

    await axios.post(baseURL+"/api/Payment/ComplatePayment", { ...formValues, email: user.email })
      .then((result) => {

        if (result.status === 200) {
          setModal(true);
          setTimeout(() => { navigate("/"); }, 2000);
        }
        else {

          toast.error(result.statusText);
        }
      })
      .catch((error) => {
        toast.error(error.response.data);
      });
  }

  const validate = (values) => {
    const errors = {};
    const cardregex = /^\d{4} ?\d{4} ?\d{4} ?\d{4}$/;
    const cvcregex = /^\d{3,4}$/;
    const zipregex = /^[0-9]*$/i;
    const expiryregex = /\d\d\/\d\d/;

    if (!values.addressText) {
      errors.addressText = "Address is required!";
    }
    if (!values.cityId) {
      errors.city = "City is required!";
    }
    if (!values.townId) {
      errors.town = "Town is required!";
    }

    if (!values.zip) {
      errors.zip = "Zip is required!";
    } else if (!zipregex.test(values.zip)) {
      errors.zip = "Invalid Zip format!";
    }

    if (!values.name) {
      errors.name = "Name is required!";
    }

    if (!values.number) {
      errors.number = "Card Number is required!";
    } else if (!cardregex.test(values.number)) {
      errors.number = "Invalid card number format!";
    }

    if (!values.cvc) {
      errors.cvc = "CVC is required!";
    } else if (!cvcregex.test(values.cvc)) {
      errors.cvc = "Invalid CVC format!";
    }

    if (!values.expiry) {
      errors.expiry = "Expiry is required!";
    } else if (!expiryregex.test(values.expiry)) {
      errors.expiry = "Invalid expiry format!";
    }

    return errors;
  };



  return (

    <div className='paymentpage' >

      <div style={{ display: "flex", width: "100%", justifyContent: "flex-start", height: "65%" }}>

        <Form className="underline" style={{ backgroundColor: "white", height: "383px", borderRadius: "5px", marginTop: "10px", marginLeft: "120px", padding: "20px", boxShadow: "5px 5px 8px 5px" }}>

          <h4 style={{ borderBottom: "1px solid black" }}>Customer Information</h4>
          <Row style={{ marginTop: "10px" }}>
            <Col md={4}>
              <FormGroup >
                <Label for="firstname">
                  First Name
                </Label>
                <Input
                  disabled
                  id="firstname"
                  name="firstname"
                  type="text"
                  value={user.firstName}
                />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="lastname">
                  Last Name
                </Label>
                <Input
                  disabled
                  id="lastname"
                  name="lastname"
                  type="text"
                  value={user.lastName}
                />
              </FormGroup>
            </Col>

            <Col md={4}>
              <FormGroup>
                <Label for="email">
                  Email
                </Label>
                <Input
                  disabled
                  id="email"
                  name="email"
                  type="email"
                  value={user.email}
                />
              </FormGroup>
            </Col>
          </Row>

          <h4 style={{ borderBottom: "1px solid black" }}>Address Information</h4>
          <Row >
            <Col md={8}>
              <FormGroup style={{ marginTop: "10px" }}>
                <Label for="address">
                  Address
                </Label>
                <Input
                  id="address"
                  name="addressText"
                  placeholder="Address Text"
                  required
                  onChange={handleInputChange}

                />
                <FormFeedback>{formErrors.addressText} </FormFeedback>



              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup style={{ marginTop: "10px" }}>
                <Label for="telephone">
                  Telephone
                </Label>
                <Input
                  id="telephone"
                  name="telephone"
                  placeholder="Telephone"
                  disabled
                  value={user.telephone}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={5}>
              <FormGroup>
                <Label for="city">
                  City
                </Label>
                <Dropdown
                  name="cityId"
                  required
                  id="city"
                  fluid
                  selection
                  options={cityoptions}
                  placeholder='Select City'
                  onChange={handleCityDropdown}
                />
                <FormFeedback>{formErrors.city} </FormFeedback>
              </FormGroup>
            </Col>
            <Col md={5}>
              <FormGroup>
                <Label for="town">
                  Town
                </Label>
                <Dropdown
                  name="townId"
                  required
                  id="town"
                  fluid
                  selection
                  options={townoptions}
                  placeholder='Select Town'
                  onChange={handleTownDropdown}
                />
                <FormFeedback>{formErrors.town} </FormFeedback>
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <Label for="zip">
                  Zip
                </Label>
                <Input
                  id="zip"
                  name="zip"
                  required
                  onChange={handleInputChange}

                />
                <FormFeedback>{formErrors.zip} </FormFeedback>
              </FormGroup>
            </Col>
          </Row>
        </Form>

        <div className="App-payment" style={{ height: "400px", marginLeft: "110px" }}>

          <Form style={{ backgroundColor: "white", borderRadius: "10px", marginTop: "10px", padding: "20px", boxShadow: "5px 5px 8px 5px" }}>
            <Card
              number={number}
              name={name}
              expiry={expiry}
              cvc={cvc}
              focused={focused}
              issuer='visa'
              preview={true}
            />
            <form style={{ height: "150px", marginTop: "10px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div className="form-group">
                <input
                  type="tel"
                  name="number"
                  className="form-control"
                  placeholder="Card Number"
                  maxLength="19"
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                />
                <FormFeedback>{formErrors.number} </FormFeedback>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Name"
                  required
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                />
                <FormFeedback>{formErrors.name} </FormFeedback>
              </div>
              <div className="row">
                <div className="col-6">
                  <input
                    type="tel"
                    name="expiry"
                    className="form-control"
                    placeholder="Valid Thru"
                    pattern="\d\d/\d\d"
                    required
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                  />
                  <FormFeedback>{formErrors.expiry} </FormFeedback>
                </div>
                <div className="col-6">
                  <input
                    type="tel"
                    name="cvc"
                    className="form-control"
                    placeholder="CVC"

                    pattern="\d{3,4}"
                    required
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                  />
                  <FormFeedback>{formErrors.cvc} </FormFeedback>
                </div>
              </div>
            </form>
          </Form>
        </div>

      </div>

      <div style={{ width: "100%" }}>

        <Form className="underline" style={{ backgroundColor: "white", width: "20%", borderRadius: "10px", margin: "auto", padding: "20px", boxShadow: "5px 5px 8px 5px" }}
          onSubmit={handleSubmit}
        >
          <Row>
            <HiShoppingBag style={{ fontSize: "60px", margin: "auto" }}></HiShoppingBag>
          </Row>

          <Row style={{ marginTop: "30px" }}>
            <Col md={12}>
              <h4 style={{ display: "flex", borderBottom: "1px solid black" }}>Total Price :  <span style={{ marginLeft: "auto" }}>$ {totalprice}</span></h4>
            </Col>
          </Row>
          <Row style={{ marginTop: "10px" }}>
            <Button color="success" style={{ padding: "10px", marginTop: "15px" }}>
              Complete Payment
            </Button>
          </Row>
        </Form>
      </div>

      <Modal isOpen={modal} centered fade >
        <ModalBody style={{ color: "green", textAlign: "center" }}>
          Payment Completed Successfully <FaCheck />
        </ModalBody>
      </Modal>

    </div>




















  )
}

export default Payment;



