import React from 'react';
import './Product.css'
import { Link } from 'react-router-dom';

const Product = (props) => {
    //  console.log(props);
     const {img,name,seller,price,stock,key} = props.product
    
    return (
        <div className="product">
            <div>
                <img src={img} alt=""/>
            </div>
            <div >
                <h3 className="product-name"><Link to= {"/product/"+key}>{name} </Link> </h3>
                <br/>
                <p>By:{seller} </p>
                <p>${price} </p>
                <p> Only{stock} left in stock  </p>
                <button className="main-button"
                 onClick={()=>props.handleAddProduct(props.product)}> 
                Add to cart </button>
            </div>
        </div>
    );
};

export default Product;