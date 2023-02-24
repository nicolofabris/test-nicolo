import React, { useEffect } from "react";
import { MapContainer, TileLayer } from "react-leaflet";


function Map() {
  
  const fetchGeoJSON = async () => {
    // example geolocation box with hard coded data
    const box = "52.5200, 13.4050, 52.5200, 13.4050"; 
    
    // fetch from api url 
    const response = await fetch(
      `https://www.openstreetmap.org/api/0.6/map?bbox=${box}`, {
        "Content-Type": "application/xml; charset=utf-8"
      }
      );
      const xmlData = await response.text();
      
      const xmlParser = require('xml2js').parseString;

    // parse xml data to json 
    xmlParser(xmlData, function(err,result) {
        if(err) {
            console.log(err)
        } else {
            const jsonData = JSON.stringify(result)
            console.log(jsonData);
        }
    }) 
  };

  // in alternative to the button we can get the dataset when the page renders, only once

  // useEffect(() => {
  //   fetchGeoJSON()
  // }, [])


  return (
    // return a map (with leaflet library) and button that when clicked, console logs dataset
    <div>
      <button onClick={fetchGeoJSON}>Fetch GeoJSON</button>
      <MapContainer center={[52.5200, 13.4050]} zoom={11} style={{ height:"100vh", width:"100vw" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      </MapContainer>
    </div>
  );
}

export default Map;
