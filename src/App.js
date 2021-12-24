import './App.css'
import {useRef,useState,useEffect} from 'react'
import mapboxgl from 'mapbox-gl'

mapboxgl.accessToken = 'pk.eyJ1Ijoia3Jpc2hhbmlzc2luZ2giLCJhIjoiY2t4a2diMDk1MXdncTJ2bnBobnhnOHRodSJ9.Xdtp4fQI7BCxbTVrX12XYw';

function App(){
  const [lng,setLng]= useState(77.580643)
  const [lat,setLat]= useState(12.972442);
  const [zoom,setZoom]= useState(9)

  const mapContainer= useRef(null)
  const map= useRef(null)

  useEffect(()=>{
    if(map.current) return;
      map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom
    });
  })

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on('move', () => {
    setLng(map.current.getCenter().lng.toFixed(4));
    setLat(map.current.getCenter().lat.toFixed(4));
    setZoom(map.current.getZoom().toFixed(2));
    });
  })
  
  return (
    <div className='App'>
      <div className="sidebar">
      Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div ref={mapContainer} className='map-container'></div>
    </div>
  )
}

export default App