import React, { useState } from 'react';
import axios from 'axios';

const OllamaComponent = () => {
    const [connectionEstablished, setConnectionEstablished] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [response, setResponse] = useState('');

    const startOllama = async () => {
        try {
            await axios.get('/api/startOllama'); // Replace with your Django server endpoint
            setConnectionEstablished(true);
        } catch (error) {
            console.error('Error starting Ollama:', error);
        }
    };

    const communicateWithOllama = async (input) => {
        try {
            const response = await axios.post('/api/communicateWithOllama', { input }); // Replace with your Django server endpoint
            return response.data;
        } catch (error) {
            console.error('Error communicating with Ollama:', error);
            return '';
        }
    };

    const handleStart = () => {
        startOllama();
    };

    const handleSubmit = async () => {
        const result = await communicateWithOllama(inputValue);
        setResponse(result);
    };

    return (
        <div>
            {!connectionEstablished && <button onClick={handleStart}>Start</button>}
            {connectionEstablished && (
                <div>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    <button onClick={handleSubmit}>Submit</button>
                </div>
            )}
            {response && <p>{response}</p>}
        </div>
    );
};

export default OllamaComponent;
