import React, { useState } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './styles/siteSuitabilityMapCss.css';
import axios from 'axios';


const SiteSuitabilityMain = ({
    csrf
}) => {
    console.log("Hello from scsfsd", csrf);
    const [markers, setMarkers] = useState([]);
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [markerArray, setMarkerArray] = useState([]); 

    const [ markerCollection, setMarkerCollection ] = useState([]); 

    const marketProps = {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 100,
    };
    

    const mapRef = React.useRef();


    const handleMapClick = (e) => {
        const latlng = e.latlng || (e.layerPoint && mapRef.current.containerPointToLatLng(e.layerPoint));
        if (latlng) {
            const { lat, lng } = latlng;
            console.log('Map clicked:', lat, lng);
            const newMarker = { lat, lng };
            setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
            setMarkerArray((prevMarkerArray) => [...prevMarkerArray, newMarker]);
        }
    };
    
    

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleSubmit = () => {
        console.log('Submit clicked', markers);
        const data = {
            location,
            markDescription: description,
            markers: markers.map((marker) => {
                return {
                    lat: marker.lat,
                    lng: marker.lng,
                };
            }),
        };
        console.log('Data:', data);
        console.log(JSON.stringify(data));
        console.log("Hello from csrdf", csrf);

        axios.post('http://localhost:8000/api/api/store-location/', {data: JSON.stringify(data)},  {
        //set the csrf token in the header
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrf
        }

    }  )
      .then(response => {
        console.log('Item added successfully:', response.data);
        //clear the markers and the description and the location
        removeMarkers();
        setMarkers([]);
        setDescription('');
        setLocation('');
        // Do something with the response, if needed
      })
      .catch(error => {
        console.error('Error adding item:', error);
      });
    };

    // Use useEffect to initialize the Leaflet map
    React.useEffect(() => {
        if (!mapRef.current) {
            mapRef.current = L.map('map').setView([51.505, -0.09], 13);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mapRef.current);
            mapRef.current.on('click', handleMapClick);
        }
     }, []);
    React.useEffect(() => {

        // Add markers to the map
        markers.forEach((marker) => {
            L.circle([marker.lat, marker.lng], marketProps).addTo(mapRef.current);
        });
        fetchMarkers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [markers]);

    function removeMarkers() { 
        mapRef.current.eachLayer(function (layer) {
            mapRef.current.removeLayer(layer);
        }
        );
        //add the tile layer again
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mapRef.current);
    }



    function fetchMarkers() {
        axios.get('http://localhost:8000/api/api/store-location/')
            .then(response => {
                console.log('Item added successfully:', response.data);
                // Do something with the response, if needed
                setMarkerCollection(response.data?.storedLocations); 
            })
            .catch(error => {
                console.error('Error adding item:', error);
            });
    }
    console.log("Hello from markerCollection", markerCollection);

    return (
        <div className="site-suitability-main" style={{ border: '2px solid red', display: 'flex' }}>
            <div className="left-pane" style={{ flex: 1 }}>
                <div id="map" style={{ height: '100%', width: '100%' }} ></div>
            </div>

            <div className="right-pane" style={{ flex: 1 }}>
                <div>
                    <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
                </div>
             
                <div>
                    <input type="text" placeholder="Description" value={description} onChange={handleDescriptionChange} />
                </div>
                <button onClick={handleSubmit}>Submit</button>
                <div className ="buttonCollection">
                <span>Stored Locations</span>
                {markerCollection.map((marker) => {
                    return (
                        <button onClick={() => {
                            removeMarkers();
                            setMarkers(marker.markers);
                            setLocation(marker.location);
                            setDescription(marker.markDescription);
                        }}>
                            <p>{marker.location}</p>
                        </button>
                    );
                })}

                </div>
            </div>
        </div>
    );
};

export default SiteSuitabilityMain;
