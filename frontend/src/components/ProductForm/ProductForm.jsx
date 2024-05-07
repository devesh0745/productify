import React, { useState } from "react";
import { addProductAsync, updateProductAsync } from "../../redux/reducers/productReducer";
import { useDispatch } from "react-redux";
import ProductList from "../ProductList/ProductList";
import "./ProductForm.css"

function ProductForm() {
    const [formData, setFormData] = useState({
        name: '',
        image: '',
        price: ''
    });
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    const dispatch = useDispatch();

    function handleSubmit(e) {
        e.preventDefault();
        if (selectedProductId) {
            dispatch(updateProductAsync({ formData, selectedProductId }));
        } else {
            dispatch(addProductAsync(formData));
        }
        setFormData({ name: "", image: "", price: "" });
        setSelectedProductId(null);
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    function updateProduct(productData) {
        const { productName, productImage, productPrice } = productData;
        console.log("image:",productImage);
        setFormData({
            name: productName,
            image: productImage,
            price: productPrice
        });
        setSelectedProductId(productData._id);
    }

    return (
        <>
        <div id="product-main-form">
            
            <form id="product-form" onSubmit={handleSubmit}>
            <div id="name-div">
            <label id="name-label">
                <input id="name-input" placeholder="Product Name" type="text" name="name" value={formData.name} onChange={handleChange} />
            </label>
            </div>
            <div id="price-div">
            <label id="price-label">
                <input id="price-input" placeholder="Product Price" type="text" name="price" value={formData.price} onChange={handleChange} />
            </label>
            </div>
            <button id="submit-btn" type="submit" >Submit</button>
        </form>

           
        </div>
        <div id="input-and-main-list">
        <h2 id="product-list-heading">Products Table</h2>  
     
        <input id="product-search"
                type="text"
                placeholder="Search by product name"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} 
            />
        <ProductList updateProduct={updateProduct} searchQuery={searchQuery} />
        </div>
        </>
    );
}

export default ProductForm;

