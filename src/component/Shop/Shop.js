import React from 'react';
import fakeData from "../../fakeData";
import './Shop.css';
import { useState } from 'react';
import Product from '../Product/Product';

const Shop = () => {
    console.log(fakeData);
    const first10 = fakeData.slice(0,10);
    const [product,setProduct] = useState(first10)
    return (
    
        <div className="shop-component">
            <div className="product-component">
             <ul>
                {
                    product.map(product=> <Product>{product.name} </Product>)
                }
             </ul>
             </div>
             <div className="cart-component">
                <h1>This is cart component</h1>
             </div>
        </div>
    );
};

export default Shop;