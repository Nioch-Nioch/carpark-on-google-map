import 
  React, 
  { useEffect, 
    useState } 
  from 'react';
import './App.css';
import { 
  GoogleMap, 
  withScriptjs, 
  withGoogleMap, 
  Marker,
  InfoWindow }
  from 'react-google-maps';
import MarkerClusterer from "react-google-maps/lib/components/addons/MarkerClusterer";
import mpaStyle from './mpaStyle';
import axios from 'axios';
import Navigation from './components/Navigation.js';
import markerAvailable from './image/available.png'
import markerUnavailable from './image/unavailable.png'


const KEY= 'AIzaSyDYPZkDalhVMmIzk4fP-18perVQfnJ493k';
const URL_BASE = 'https://dev.vozilla.pl/api-client-portal/map?objectType='
const URL_PARKING = URL_BASE + 'PARKING';
const URL_POI = URL_BASE + 'POI';
const URL_VEHICLE = URL_BASE + 'VEHICLE';


function App() {
  const [parking, setParking] = useState(null);
  const [poi, setPoi] = useState(null);
  const [vehicle, setVehicle] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [zoom, setZoom] = useState(7);
  const [selectedMarkers, setSelectedMarkers] = useState("ALL");

  useEffect(() =>{
    if(selectedMarkers === "PARKING"){
      axios.get(URL_PARKING)
      .then(response => {
        setParking(response.data)
      })
      setPoi(null);
      setVehicle(null);
    } else if (selectedMarkers === "VEHICLE") {
      axios.get(URL_VEHICLE)
      .then(response => {
        setVehicle(response.data)
      })
      setPoi(null);
      setParking(null);
    } else if (selectedMarkers === "POI") {
      axios.get(URL_POI)
      .then(response => {
        setPoi(response.data)
      })
      setVehicle(null);
      setParking(null);
    } else {
      axios.get(URL_PARKING)
      .then(response => {
        setParking(response.data)
      })
    axios.get(URL_VEHICLE)
      .then(response => {
        setVehicle(response.data);
      })
    axios.get(URL_POI)
      .then(response => {
        setPoi(response.data);
      })
    }
    console.log(selectedMarkers);
  }, [selectedMarkers])

  const WrappedMap = withScriptjs(withGoogleMap((props) =>
    <GoogleMap 
      defaultZoom={zoom} 
      defaultCenter={{ lat: 51.107883, lng: 17.038538 }}
      defaultOptions={{styles: mpaStyle}} 
    > 
      <MarkerClusterer
        onClick={props.onMarkerClustererClick}
        averageCenter
        enableRetinaIcons
        gridSize={60}
      >
      {parking && parking.objects.map((carpark) => 
        (
          <Marker 
            key={carpark.id} 
            position={{
              lat: carpark.location.latitude, 
              lng: carpark.location.longitude 
            }}
            onClick={() => {
              setSelectedMarker(carpark);
              setZoom(17)
            }}
            icon={"https://developers.google.com/maps/documentation/javascript/examples/full/images/parking_lot_maps.png"}
          />
        ))}
        
        {poi && poi.objects.map((poi) => 
        (
          <Marker 
            key={poi.id} 
            position={{
              lat: poi.location.latitude, 
              lng: poi.location.longitude 
            }}
            onClick={() => {
              setSelectedMarker(poi);
              setZoom(17)
            }}
            icon={"https://developers.google.com/maps/documentation/javascript/examples/full/images/info-i_maps.png"}
          />
        ))}
        {vehicle && vehicle.objects.map((vehicle) => (
            <Marker 
              key={vehicle.id} 
              position={{
                lat: vehicle.location.latitude, 
                lng: vehicle.location.longitude 
              }}
              onClick={() => {
                setSelectedMarker(vehicle);
                setZoom(17)
              }}
              icon={vehicle.status.toUpperCase() === "AVAILABLE" ? markerAvailable : markerUnavailable}
            />
          ))}
        </MarkerClusterer>
        {selectedMarker && (
          <InfoWindow
            position={{
            lat: selectedMarker.location.latitude, 
            lng: selectedMarker.location.longitude 
          }}
          onCloseClick={()=> {
            setSelectedMarker(null);
            setZoom(7)
          }}
        >
          <div>
            {selectedMarker.discriminator.toUpperCase() === "VEHICLE" ? <div>{selectedMarker.name.toUpperCase()} <br/>Poziom baterii: {selectedMarker.batteryLevelPct} %</div> : <></>}
            {selectedMarker.discriminator.toUpperCase() === "PARKING" ? <div>{selectedMarker.discriminator.toUpperCase()}<br/>{selectedMarker.address.city}, {selectedMarker.address.street} {selectedMarker.address.house}</div> : <></>}
            {selectedMarker.discriminator.toUpperCase() === "POI" ? <div>{selectedMarker.description.toUpperCase()}<br/>{selectedMarker.address.city}, {selectedMarker.address.street} {selectedMarker.address.house}</div> : <></>}         
          </div> 
        </InfoWindow>
        )}
    </GoogleMap >
  ));

  return (
    <div className="App" >
      <main id='App__map'>
        <WrappedMap 
          googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=gemotry,drawing,places&key=${KEY}`}
          loadingElement = {<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100%` }} />}      
          mapElement = {<div style={{ height: `100%` }} />}
        />
      </main>
      <nav className='App__navigation'>
        {selectedMarker && <Navigation selectedMarker={selectedMarker} />}
        <div class='navigation__bar'>
                  <button class='navigation__bar--btn' onClick={() => {setSelectedMarkers("VEHICLE"); setZoom(7)}}>Cars</button>
                  <button class='navigation__bar--btn' onClick={() => {setSelectedMarkers("PARKING"); setZoom(7)}}>Parking</button>
                  <button class='navigation__bar--btn' onClick={() => {setSelectedMarkers("POI"); setZoom(7)}}>POI</button>
                  <button class='navigation__bar--btn' onClick={() => {setSelectedMarkers("ALL"); setZoom(7)}}>ALL</button>
         </div> 
      </nav>
    </div>
  );
}

export default App;
