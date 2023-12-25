import React, { useState } from 'react';
import AddItem from '../../components/addItem';
import OllamaComponent from '../../components/ollama';
const Routes = ({
    csrf
}) => {
    const [selectedRoute, setSelectedRoute] = useState(null);

    const handleRouteClick = (route) => {
        setSelectedRoute(route);
    };

    return (
        <div>
            <div className="left-pane">
                <ul>
                    <button onClick={() => handleRouteClick('addItem')}>Add Item</button>
                    <button onClick={() => handleRouteClick('OllamaComponent')}>OllamaComponent</button>
                    <button onClick={() => handleRouteClick('addItem')}>Add Item</button>
                    <button onClick={() => handleRouteClick('addItem')}>Add Item</button>
                    <button onClick={() => handleRouteClick('addItem')}>Add Item</button>
                    <button onClick={() => handleRouteClick('addItem')}>Add Item</button>
                </ul>
            </div>
            <div className="right-pane">
                {selectedRoute === 'addItem' && <AddItem 
                csrf={csrf} />}
                {selectedRoute === 'OllamaComponent' && <OllamaComponent />}
            </div>
        </div>
    );
};

export default Routes;

