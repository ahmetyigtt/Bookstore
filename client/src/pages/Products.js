import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import "./css/Products.css";

import { toast} from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { MdOutlineFavorite } from 'react-icons/md';
import { Input } from 'reactstrap';
import { BiSearchAlt } from 'react-icons/bi';
import { HiFilter } from 'react-icons/hi';
import { CgSortAz } from 'react-icons/cg';
import { Dropdown } from 'semantic-ui-react';
import { sortOptions } from "../data/DropdownDatas";
import { baseURL } from '../data/Urls'


const Products = () => {

    const [data, setData] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState(data);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState(' ');
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        let timeoutId;

        const handleSearch = () => {
            const newFilteredBooks = data.filter(book =>
                book.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            sorter(newFilteredBooks);
            setFilteredBooks(newFilteredBooks);
        };

        if (searchTerm) {
            timeoutId = setTimeout(handleSearch, 500);
        } else {
            sorter(data);
            setFilteredBooks(data);
        }

        return () => {
            clearTimeout(timeoutId);
        };
    }, [searchTerm, data]);

    useEffect(() => {

        const nextList = [...filteredBooks];
        sorter(nextList);
        setFilteredBooks(nextList);
        
    }, [sortBy]);

    useEffect(() => {

        axios.get(baseURL+"/api/Book/GetAllBooks")
            .then((result) => { setData(result.data) })
            .catch((error) => console.log(error));


        axios.get(baseURL+"/api/Category/GetCategoryList")
            .then((result) => { setCategories(result.data.map((category) => ({ text: category.name, value: category.id }))) })
            .catch((error) => console.log(error));

    }, []);


    const sorter = (list) => {

        list.sort((a, b) => {

            if (sortBy === 1) {
                if (a.name < b.name) return -1;
                if (a.name > b.name) return 1;
                return 0;
            }
            else if (sortBy === 2) {
                if (a.name < b.name) return 1;
                if (a.name > b.name) return -1;
                return 0;
            }
            else if (sortBy === 3) {
                return a.price - b.price;
            }
            else if (sortBy === 4) {
                return b.price - a.price;
            }
        });
    }

    const handleSearchInput = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSortBy = async (e, { value }) => {
        setSortBy(value);
    }

    const addToCart = async (item) => {

        if (!localStorage.getItem('user')) {
            navigate("/login")
            return;
        }

        await axios.post(baseURL+`/api/Cart/AddToCart?bookId=${item.id}`)
            .then((result) => {
                if (result.status === 200) {
                    toast.success(result.data);
                }
            })
            .catch((error) => {
                toast.error(error.response.data);
            });
    }

    const addToFavorite = async (id) => {

        if (!localStorage.getItem('user')) {
            navigate("/login")
            return;
        }

       await axios.post(baseURL+`/api/Favorite/AddToFavorites?bookId=${id}`)
            .then((result) => {
                if (result.status === 200) {
                    toast.success(result.data);
                }
               
            })
            .catch((error) => {
                toast.error(error.response.data);
            });

    }

    const handleCategory = async (e, { value }) => {

        await axios.get(baseURL+`/api/Book/GetBooksByCategory?categoryId=${value}`)
            .then((result) => {
                if (result.status === 200) {
                    setData(result.data);
                }
                else {
                    toast.error(result.statusText);
                }
            })
            .catch((error) => {
                toast.error(error.response.data);
            });
    }

    return (
        <div style={{ display: "flex" }}>

            <div className='sidebar' style={{ width: "15%", position: "fixed" }}>

                <div style={{ marginTop: "20px" }}>
                    <h5 style={{ textAlign: "center" }}>Search Book</h5>
                    <div style={{ display: "flex", marginTop: "10px" }}>
                        <BiSearchAlt style={{ fontSize: "30px" }} />
                        <Input style={{ marginRight: "3px" }}
                            type="search"
                            placeholder='Type to search'
                            onChange={handleSearchInput}
                        />
                    </div>
                </div>

                <div style={{ marginTop: "50px" }}>
                    <h5 style={{ textAlign: "center" }} >Category</h5>

                    <div style={{ display: "flex", marginTop: "10px" }}>
                        <HiFilter style={{ fontSize: "30px" }} />
                        <Dropdown
                            style={{ marginRight: "10px" }}
                            required
                            fluid
                            selection
                            options={categories}
                            placeholder='Select Category'
                            onChange={handleCategory}
                        />
                    </div>
                </div>

                <div style={{ marginTop: "60px" }}>
                    <h5 style={{ textAlign: "center" }} >Sort By</h5>

                    <div style={{ display: "flex", marginTop: "10px" }}>
                        <CgSortAz style={{ fontSize: "30px" }} />
                        <Dropdown
                            style={{ marginRight: "10px" }}
                            clearable
                            required
                            fluid
                            selection
                            options={sortOptions}
                            placeholder="Select Option"
                            onChange={handleSortBy}

                        />
                    </div>
                </div>

            </div>

            <div className='products '>
                <div  id='products' >
                    {
                        filteredBooks && filteredBooks.length > 0 ?
                            filteredBooks.map((product) => {
                                return (
                                    <Fragment key={product.id} >
                                        <div  className='card hvr-grow'>
                                            <div>
                                                <img className='product-image' src={product.image} alt="foto" />
                                            </div>

                                            <div>
                                                <h3 className='product-name'>{product.name}</h3>
                                            </div>

                                            <div>
                                                <h3 className='product-category'>{product.category}</h3>
                                            </div>

                                            <div className='product-price'>
                                                $ {product.price}
                                            </div>

                                            <div>
                                                <button className='product-add-button' onClick={() => addToCart(product)}>Add to Cart</button>
                                            </div>

                                            <div style={{ display: "flex", justifyContent: "center" }}>
                                                <button className='product-fav-button' onClick={() => addToFavorite(product.id)}>
                                                    <MdOutlineFavorite id='product-fav-button-icon' />

                                                </button>
                                            </div>


                                        </div>
                                    </Fragment>
                                )
                            }) : "No Books To Show"

                    }

                </div>
            </div>
        </div>
    )
}

export default Products;
