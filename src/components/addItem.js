import React, { useState } from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true;

document.cookie = 'X-CSRFToken=csrfToken';

const AddItem = ({
    csrf
}) => {
  const [itemName, setItemName] = useState('');

  const handleItem = (name, description) => {
    //chek if the item name is in the itemName state if yes then get it ad modify the description else create a new item 
    //if the item name is in the itemName state then get it and modify the description else create a new item

    setItemName({ ...itemName, [name]: description });


  }
  const handleAddItem = () => {
    console.log("Hello from handleAddItem", csrf);
    axios.post('http://localhost:8000/api/api/items/', { foo: itemName },  {
        //set the csrf token in the header
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrf
        }

    }  )
      .then(response => {
        console.log('Item added successfully:', response.data);
        // Do something with the response, if needed
      })
      .catch(error => {
        console.error('Error adding item:', error);
      });

  };

  return (
    
    <div>
      <input
        type="text"
        onChange={(e) => handleItem("name", e.target.value)}
      />
       <input
        type="text"
    
        onChange={(e) => handleItem("description", e.target.value)}
      />
      <button onClick={handleAddItem}>Add Item</button>
    </div>
  );
};

export default AddItem;
