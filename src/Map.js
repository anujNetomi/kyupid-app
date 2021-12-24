import React, {useRef,useState,useEffect} from 'react'
import mapboxgl from 'mapbox-gl'

mapboxgl.accessToken='pk.eyJ1Ijoia3Jpc2hhbmlzc2luZ2giLCJhIjoiY2t4a2diMDk1MXdncTJ2bnBobnhnOHRodSJ9.Xdtp4fQI7BCxbTVrX12XYw'

function Map(){

    const [lng,setLng] = useState()
    const [lat,setLat]= useState()

    const containerRef= useRef()
    const map= useRef(null)
    
    useEffect(()=>{
      if(map.current) return;
      map.current= new mapboxgl.Map({
         container: mapContainer.current,
         style: 'mapbox://styles/mapbox/streets-v11',
         center: [lng,lat],
         zoom:zoom,
      })
    })

  return(
   <div>
       <div className='map-container' ref={containerRef}></div>
   </div>
  )
}

export default Map