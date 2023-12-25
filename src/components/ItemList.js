import axios from 'axios';
import React, { useEffect, useState } from 'react';

// Ignore ESLint and Prettier formatting for this file
/* eslint-disable */

const ItemList = ( 
    {setCsrf, refresh}
) => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        axios
            .get('http://localhost:8000/api/api/items/')
            .then((response) => {
                setItems(response.data);
                setCsrf(response.data.credentials.csrf);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });


    }, [refresh]);



    console.log("Hello from items", items);

    return (
        <div>
            <h1>Items</h1>
            <ul>
              
            </ul>
        </div>
    );
};

export default ItemList;
