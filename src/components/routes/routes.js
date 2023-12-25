import React, { useState } from 'react';
import AddItem from '../../components/addItem';
import OllamaComponent from '../../components/ollama';
import SiteSuitabilityMain from '../siteSuitabilityMain';
const Routes = ({
    csrf
}) => {
    const [selectedRoute, setSelectedRoute] = useState(0);

    const handleRouteClick = (route) => {
        setSelectedRoute(route);
    };

    return (
        <div>
            <div className="top-pane">
                <ul>
                    <button onClick={() => handleRouteClick('addItem')}>Add Item</button>
                    <button onClick={() => handleRouteClick('OllamaComponent')}>OllamaComponent</button>
                    <button onClick={() => handleRouteClick('SiteSuitabilityMain')}>SiteSuitabilityMain</button>
                    <button onClick={() => handleRouteClick('addItem')}>Add Item</button>
                    <button onClick={() => handleRouteClick('addItem')}>Add Item</button>
                    <button onClick={() => handleRouteClick('addItem')}>Add Item</button>
                </ul>
            </div>
            <div className="bottom-pane">
                {selectedRoute === 'addItem' && <AddItem 
                csrf={csrf} />}
                {selectedRoute === 'OllamaComponent' && <OllamaComponent />}
                {selectedRoute === 'SiteSuitabilityMain' && <SiteSuitabilityMain   csrf={csrf} />}
            </div>
        </div>
    );
};

export default Routes;

