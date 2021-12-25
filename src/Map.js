import React, {useState} from 'react'
import ReactMapGl, {Marker} from 'react-map-gl'
import './App.css'
import * as mapData from './API/Area.json'

function Map(){
  const [viewport,setViewport]= useState({
    latitude:12.972442,
    longitude:77.580643,
    zoom:10,
    width: window.innerWidth,
    height: window.innerHeight,
    pitch:35
  })

  return (
    <ReactMapGl 
    mapboxApiAccessToken={'pk.eyJ1Ijoia3Jpc2hhbmlzc2luZ2giLCJhIjoiY2t4bGQ4dDA5MGJkeDJ3a290NmNicW9hOSJ9.4My0OZ5m3_LI8LSXSf8XvA'}

    mapStyle="mapbox://styles/mapbox/dark-v9"
    {...viewport}
    width='100vw'
    height='100vh'
    onViewportChange={(newView)=> setViewport(newView)}>

     {mapData.features.map((item)=>{
       <Marker key={item.properties.pin_code} latitude={item.geometry.coordinates[0]} longitude={item.geometry.coordinates[1]}>
         <button className='marker-btn'>
           <img src="/public/heart_PNG51347.png" alt='heart icon'/>
         </button>
       </Marker>
     })}     
    </ReactMapGl>
  )
}
export default Map