import React, { useState, useEffect } from 'react';
import Cart from '../Cart/Cart';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import happyImage from '../../images/giphy.gif';
import { Link } from 'react-router-dom';
import { useAuth } from '../Login/useAuth';

const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlace] = useState(false);
    const auth = useAuth();

    const handlePlaceOrder = () => {
        setCart([]);
        setOrderPlace(true);
        processOrder();
    }
    const romoveProduct = (productkey) => {
        const newCart = cart.filter(pd => pd.key !== productkey);
        setCart(newCart);
        removeFromDatabaseCart(productkey);
    }

    useEffect(() => {
        const saveCart = getDatabaseCart();
        const productkeys = Object.keys(saveCart);
        const cartProducts = productkeys.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = saveCart[key];
            return product;
        });
        setCart(cartProducts);
    }, []);
    let thankyou;
    if (orderPlaced) {
        thankyou = <img src={happyImage} alt="" />
    }
    return (
        <div className="Twin-component">
            <div className="product-component">
                {
                    cart.map(pd => <ReviewItem
                        romoveProduct={romoveProduct}
                        product={pd}></ReviewItem>)
                }
                {
                    thankyou
                }
                {
                    !cart.length && <h1>Your cart is empty.<a href='/shop'>Keep Shopping</a></h1>
                }
            </div>
            <div className="cart-component">
                <Cart cart={cart}>
                    <Link to="shipment">
                        {
                            auth.user ?
                                <button className='main-button'>Proceed checkout</button>
                                :
                                <button className='main-button'>LogIn to Proceed</button>

                        }
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Review;