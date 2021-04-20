import './Card.css';

import React, {useMemo, useState} from 'react';

//it will hold only x number of items
const Card = (props) => {
    const {imageUrl="", name="", price="", category="", classname=""} = props;

    return (
        <span className={`CardItem ${classname}`} >
            <img src={!imageUrl.startsWith("http") ? `images/${imageUrl}` : imageUrl} className="CardItem__ProductImage" alt="image" />
            <div className="CardItem__Details">{name}</div>
            <div className="CardItem__Details">{price}</div>
        </span>

    );

};
export default Card;