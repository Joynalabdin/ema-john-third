import React from 'react';

const Cart = (props) => {
    const cart = props.cart
    // console.log(cart);
    // const total = cart.reduce ((total,prd)=>total +prd.price,0);
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        total = total + product.price*product.quantity;
        
    }
    let shipping = 0;
    if(total>35){
        shipping=0;
    }
    else if(total>15){
        shipping=4.99;
    }
    else if (total>0){
        shipping=12.99
    }
     const tax = (total / 10).toFixed(2);
     const grandTotal = (total+shipping+Number(tax)).toFixed(2);
     const formatNumber = num=>{
         const precision = num.toFixed(2);
         return Number(precision);
     }
    return (
        <div>
            <h3>Order summary</h3>
            <h5>Items Ordered:{cart.length} </h5>
            <p>product price:{formatNumber(total)} </p>
            <p>shipping Cost:{shipping} </p>
            <p>Total price:{grandTotal } </p>
            <p>Tax+vat:{tax} </p>
            {
               props.children
            }
        </div>
    );
};

export default Cart;