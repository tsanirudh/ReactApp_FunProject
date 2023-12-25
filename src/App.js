import React, { useEffect, useState } from 'react';
import './App.css';
import ItemList from './components/ItemList';
import AddItem from './components/addItem';
import Routes from './components/routes/routes';
import axios from 'axios';

function App() {
    const [csrfToken, setCsrfToken] = useState('');

    useEffect(() => {
        const fetchCsrfToken = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/api/items/');
                const csrf = response.data.credentials.csrf;
                setCsrfToken(csrf);
                console.log('csrf', csrf);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchCsrfToken();
    }, []);

    return (
        <div className="App">
            <Routes csrf={csrfToken} />
        </div>
    );
}

export default App;