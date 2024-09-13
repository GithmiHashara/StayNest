'use client'


import L from 'leaflet'
import { MapContainer, TileLayer, Marker } from 'react-leaflet'

import 'leaflet/dist/leaflet.css'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'


// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl // eslint-disable-line
L.Icon.Default.mergeOptions({
    //we assign the image URLs to the iconUrls and shadowUrl properties of the Default icon
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src
})

interface MapProps {
    center?: number[]
  }
  
  const Map: React.FC<MapProps> = ({ center }) => {
    return (
      <MapContainer  //MapContainer is a component that creates a map in the DOM
        center={(center as L.LatLngExpression) || [51, -0.09]}
        zoom={center ? 4 : 2}
        scrollWheelZoom={false}
        className="h-[35vh] rounded-lg"
      >
        
        <TileLayer //TileLayer is a component that displays a tile layer on the map
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      
        {center && <Marker position={center as L.LatLngExpression} />}    
        {/* //Marker is a component that adds a marker to the map */}
      </MapContainer>
    )
  }
  
  export default Map;



// In this snippet, we have created a Map component that uses the react-leaflet library to display an interactive map. We have also added a custom marker icon to the map.  

//leaflet is an open-source JavaScript library for mobile-friendly
//  interactive maps. It is developed by Vladimir Agafonkin of MapBox 
//  with a team of dedicated contributors. We can use it to create
//   interactive maps in our React applications.