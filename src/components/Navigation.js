function Navigation({ selectedMarker }) {
    return ( 
        <>
            {selectedMarker && selectedMarker.discriminator.toUpperCase() === "VEHICLE" 
          ? <div className='navigation__article navigation__article-vehicle'>
              <h1 className='navigation__title'>{selectedMarker.name.toUpperCase()}</h1>
              <article className='navigation__info'>
                Car range: {selectedMarker.rangeKm} Kilometers <br/>
                Car category: {selectedMarker.type}<br/>
                Side number: {selectedMarker.sideNumber}<br/>
                <span style={{fontSize:"1.1rem",fontWeight:"bold"}}>Car color </span><div className='navigation__info--car-color' style={{backgroundColor: selectedMarker.color}} ></div>
              </article>
              <h2 className='navigation__title navigation__title-second'>Battery level: {selectedMarker.batteryLevelPct} %</h2>
              <div className="baterry-items">
                {selectedMarker.batteryLevelPct > 99 
                  ?<div className="battery battery_status_charged-is-full"></div>
                  : <></>}
                {selectedMarker.batteryLevelPct > 80 && selectedMarker.batteryLevelPct < 99
                  ?<div className="battery battery_status_charged-is-not-full"></div>
                  : <></>}
                {selectedMarker.batteryLevelPct < 20 
                  ?<div className="battery battery_status_discharged"></div>
                  : <></>} 
                {selectedMarker.batteryLevelPct < 20 && selectedMarker.batteryLevelPct > 80 
                  ?<div className="battery battery_status_halfway"></div>
                  : <></>}                             
              </div>
            </div> 
          : <></>}
            
          {selectedMarker && selectedMarker.discriminator.toUpperCase() === "PARKING" 
            ? <div className='navigation__article navigation__article-parking'>
                <h1 className='navigation__title'>{selectedMarker.description.toUpperCase()}</h1>
                <article className='navigation__info'>
                  <span style={{fontWeight:"bold"}}>Adress: </span>{selectedMarker.address.city && selectedMarker.address.city}, {selectedMarker.address.street && selectedMarker.address.street} {selectedMarker.address.house && selectedMarker.address.house}
                </article>
                <h2 className='navigation__title navigation__title-second'>Available parking places: {selectedMarker.availableSpacesCount}</h2>
                <div className='navigation__box-for-spaces' style={{backgroundColor: 'white', display: `grid`, gridTemplate: '1fr / auto'}}>
                  <div className='navigation__box-for-spaces--available' style={{backgroundColor: 'green', gridColumn: "1 / " + (selectedMarker.availableSpacesCount + 1)}}></div>
                  <div className='navigation__box-for-spaces--unavailable' style={{backgroundColor: 'red', gridColumn: (selectedMarker.availableSpacesCount) + " / " + (selectedMarker.spacesCount + 1)}}></div>
                </div>              
              </div> 
            : <></>}
            
          {selectedMarker && selectedMarker.discriminator.toUpperCase() === "POI" 
            ? <div className='navigation__article navigation__article-poi'>
                <h1 className='navigation__title'>{selectedMarker.description.toUpperCase()}</h1>
                <article className='navigation__info'>
                  <span style={{fontWeight:"bold"}}>Adress: </span>{selectedMarker.address.city && selectedMarker.address.city}, {selectedMarker.address.street && selectedMarker.address.street} {selectedMarker.address.house && selectedMarker.address.house}
                </article>
              <h2 className='navigation__title navigation__title-second'>Information about that place: </h2>
              <article className='navigation__info navigation__info-second'>
                  {selectedMarker.category}
              </article>            
            </div> 
            : <></>} 
        </>
     );
}

export default Navigation;