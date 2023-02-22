import axios from 'axios';
import React, { useEffect,useState } from 'react'

import { useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';
import { BsFillCartPlusFill } from 'react-icons/bs';
import { MdDeleteForever } from 'react-icons/md';
import { FaHeart } from 'react-icons/fa';
import { toast} from 'react-toastify';
import "./css/Favorite.css";
import { baseURL } from '../data/Urls'

const Favorite = () => {

    const [data, setData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {

        if (!localStorage.getItem('user')) {
            navigate("/login");
        }

        axios.get(baseURL+"/api/Favorite/GetFavorites")
            .then((result) => { setData(result.data) })
            .catch((error) => console.log(error));

    }, []);

    const deleteFromFavorites = async (id) => {

        await axios.delete(baseURL+`/api/Favorite/${id}`)
            .then((result) => {
                setData(data.filter(item => item.id !== id))
            })
            .catch((error) => console.log(error));
    }


    const addToCart = async (item) => {

        await axios.post(baseURL+`/api/Cart/AddToCart?bookId=${item.id}`)
            .then((result) => {
                if (result.status === 200) {

                    setData(data.filter(book => book.id !== item.id));
                    toast.success(result.data);
                    deleteFromFavorites(item.id);
                }
            })
            .catch((error) => {
                toast.error(error.response.data);
            });
    }


    return (
        <div >
            <div style={{ display: "flex", justifyContent: "center", zIndex: "2" }}>
                <div className='favorite-header'>Your Favorites <FaHeart style={{ marginLeft: "5px", color: "red" }} /></div>
            </div>

            <div className='favorite-container'>
                <div id="favorite-container">


                    {data && data.length > 0 ?

                        data.map((item) =>
                        (
                            <div key={item.id} className='favorite hvr-grow'>

                                <img className='favorite-image' src={item.image} alt="photo" />

                                <div style={{ width: "100%" }}>
                                    <h3 className='favorite-name'>{item.name}</h3>

                                    <div className='favorite-price'>
                                        ${item.price}
                                    </div>

                                    <div style={{ width: "50%", display: "flex", justifyContent: "space-around" }}>

                                        <Button className="hvr-icon-grow" color="danger" onClick={() => deleteFromFavorites(item.id)}>
                                            <MdDeleteForever className="hvr-icon" style={{ fontSize: "18px" }} />
                                        </Button>

                                        <Button className="hvr-icon-grow" color="success" onClick={() => addToCart(item)}>
                                            <BsFillCartPlusFill className="hvr-icon" style={{ fontSize: "18px" }} />
                                        </Button>
                                    </div>
                                </div>

                            </div>
                        )

                        )
                        :

                        (<div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%", height: "50vh" }}>
                            <img style={{ opacity: "0.8",objectFit: "scale-down", width: "30%", height: "28%" }} src={require('../data/nofavourites.png')} />
                            <h1 style={{ opacity: "0.6", fontStyle: "bold", textAlign: "center", fontSize: "25px" }}>Your Favorites is Empty</h1>

                        </div>)
                    }



                </div>
            </div>
        </div>
    )
}

export default Favorite;
