import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1Ijoia3Jpc2hhbmlzc2luZ2giLCJhIjoiY2t4bHhzZjdiM2hwMTJxcGdjNjRzM3NncyJ9.h5nCf2SgIPDb1awgNOfLyw';

 function Map() {
  const mapContainerRef = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(77.74495913453232);
  const [lat, setLat] = useState(12.993406628665984);
  const [zoom, setZoom] = useState(10);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/dark-v10',
      center: [lng, lat],
      zoom: zoom,
      pitch:50
    });
  });

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  return (
    <div>
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div ref={mapContainerRef} className="map-container" />
    </div>
  );
}

export default Map
