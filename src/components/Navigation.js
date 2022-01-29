function Navigation(selectedMarker) {
    selectedMarker = selectedMarker.selectedMarker;
    return ( 
        <nav>
            {selectedMarker && selectedMarker.discriminator.toUpperCase() === "VEHICLE" 
          ? <div class='App__navigation--vehicle'>
              <h1 class='navigation__title'>{selectedMarker.name.toUpperCase()}</h1>
              <article class='navigation__info'>
                Zasięg auta: {selectedMarker.rangeKm} Kilometrów <br/>
                Kategoria auta: {selectedMarker.type}<br/>
                Numer boczny: {selectedMarker.sideNumber}<br/>
                <span style={{fontSize:"1.1rem",fontWeight:"bold"}}>Kolor auta </span><div class='navigation__info--car-color' style={{backgroundColor: selectedMarker.color}} ></div>
              </article>
              <h2 class='navigation__title navigation__title-second'>Poziom baterii: {selectedMarker.batteryLevelPct} %</h2>
              <div class="baterry-items">
                {selectedMarker.batteryLevelPct > 99 
                  ?<div class="battery battery_status_charged-is-full"></div>
                  : <></>}
                {selectedMarker.batteryLevelPct > 80 && selectedMarker.batteryLevelPct < 99
                  ?<div class="battery battery_status_charged-is-not-full"></div>
                  : <></>}
                {selectedMarker.batteryLevelPct < 20 
                  ?<div class="battery battery_status_discharged"></div>
                  : <></>} 
                {selectedMarker.batteryLevelPct < 20 && selectedMarker.batteryLevelPct > 80 
                  ?<div class="battery battery_status_halfway"></div>
                  : <></>}                             
              </div>
            </div> 
          : <></>}
            
          {selectedMarker && selectedMarker.discriminator.toUpperCase() === "PARKING" 
            ? <div class='App__navigation--parking'>
                <h1 class='navigation__title'>{selectedMarker.description.toUpperCase()}</h1>
                <article class='navigation__info'>
                  Adres: {selectedMarker.address.city}, {selectedMarker.address.street} {selectedMarker.address.house}
                </article>
                <h2 class='navigation__title navigation__title-second'>Dostępne miejsca: {selectedMarker.availableSpacesCount}</h2>
                <div class='navigation__box-for-spaces' style={{backgroundColor: 'white', display: `grid`, gridTemplate: '1fr / auto'}}>
                  <div class='navigation__box-for-spaces--available' style={{backgroundColor: 'green', gridColumn: "1 / " + (selectedMarker.availableSpacesCount + 1)}}></div>
                  <div class='navigation__box-for-spaces--unavailable' style={{backgroundColor: 'red', gridColumn: selectedMarker.availableSpacesCount + " / " + selectedMarker.spacesCount}}></div>
                </div>              
              </div> 
            : <></>}
            
          {selectedMarker && selectedMarker.discriminator.toUpperCase() === "POI" 
            ? 
              <div>
                {selectedMarker.description.toUpperCase()}<br/>
                {selectedMarker.address.city}, {selectedMarker.address.street} {selectedMarker.address.house}
              </div> 
            : <></>} 
        </nav>
     );
}

export default Navigation;