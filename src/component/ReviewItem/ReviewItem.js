import React from 'react';

const ReviewItem = (props) => {
    const {name,quantity,key,price} = props.product
    const ReviewItemStyle ={
        borderBottom:"1px solid gray",
        marginBottom:"5px",
        paddingBottom:"5px",
        marginLeft:"100px"
        
    }
    return (
        <div style={ReviewItemStyle}>
            <h5 className="product-name">{name}</h5>
            <h3>{quantity} </h3>
            <p>price:${price} </p>
            <button 
            onClick={()=>props.romoveProduct(key)}
            className="main-button">
                Remove</button>
        </div>
    );
};

export default ReviewItem;