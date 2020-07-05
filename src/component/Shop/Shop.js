import React, { useEffect } from 'react';
import { useState } from 'react';
import fakeData from "../../fakeData";
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { Link } from 'react-router-dom';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';

const Shop = () => {
    
    const first10 = fakeData.slice(0,10);
    const [products,setProducts] = useState(first10);
    const [cart,setCart]=useState([]);
    
    useEffect (()=>{
        const saveCart= getDatabaseCart();
        const productkeys = Object.keys(saveCart);
        const previousCart = productkeys.map(existingkeys=>{
            const product = fakeData.find(pd=>pd.key===existingkeys);
            product.quantity = saveCart[existingkeys];
            return product;
        })
        setCart(previousCart);
    },[])

    const handleAddProduct =(product)=>{
        const toBeAddedKey = product.key;
        const sameProduct = cart.find(pd=>pd.key === toBeAddedKey);
        let count =1;
        let newCart;
        if(sameProduct){
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const other = cart.filter(pd=>pd.key !== toBeAddedKey);
            newCart = [...other,sameProduct];
        }
        else{
            product.quantity = 1;
            newCart =[...cart, product];
        }
        setCart(newCart);
        addToDatabaseCart (toBeAddedKey,count);
    }
    return (
    
        <div className="Twin-component">
            <div className="product-component">
             
                {
                    products.map(pd=> <Product 
                        key={pd.key}
                        handleAddProduct = {handleAddProduct}
                        product={pd}> 
                        </Product>)
                }
             
             </div>
             <div className="cart-component">
                <Cart cart={cart}>
                    <Link to="/review">
                        <button className="main-button">Order Review</button>
                    </Link>
                </Cart>
             </div>
        </div>
    );
};

export default Shop;