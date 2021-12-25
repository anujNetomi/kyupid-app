import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
// import geoJson from './API/Area'

mapboxgl.accessToken = 'pk.eyJ1Ijoia3Jpc2hhbmlzc2luZ2giLCJhIjoiY2t4bHhzZjdiM2hwMTJxcGdjNjRzM3NncyJ9.h5nCf2SgIPDb1awgNOfLyw';

function Map() {
  let hoveredStateId = null;
  const mapContainerRef = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(77.74495913453232);
  const [lat, setLat] = useState(12.993406628665984);
  const [zoom, setZoom] = useState(10);

  const popup = new mapboxgl.Popup({
    closeButton: true,
    closeOnClick: false
  });


  const popupText = (feature) => {
    const {properties : {name,pin_code,area_id}} = feature
    return `<div>
        <div>Name : ${name}</div>
        <div>Pincode : ${pin_code}</div>
        <div>Area id : ${area_id}</div>
    </div>`
  }



  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/dark-v10',
      center: [lng, lat],
      zoom: zoom,
      pitch: 50
    });
  });

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });

    map.current.on('load', () => {
      map.current.addSource('bangalore', {
        type: 'geojson',
        data: 'https://kyupid-api.vercel.app/api/areas',
        generateId: true
      })

      // Add a new layer to visualize the polygon.
      map.current.addLayer({
        'id': 'bangalore-fill',
        'type': 'fill',
        'source': 'bangalore', // reference the data source
        'layout': {},
        'paint': {
          'fill-color': '#0080ff', // blue color fill
          'fill-opacity': [
            'case',
            ['boolean', ['feature-state', 'hover'], false],
            1,
            0.5
          ]
        }
      });
      // Add a black outline around the polygon.
      map.current.addLayer({
        'id': 'bangalore-border',
        'type': 'line',
        'source': 'bangalore',
        'layout': {},
        'paint': {
          'line-color': '#000',
          'line-width': 1
        }
      });

      // When the user moves their mouse over the state-fill layer, we'll update the
      // feature state for the feature under the mouse.
      map.current.on('mousemove', 'bangalore-fill', (e) => {
        map.current.getCanvas().style.cursor = 'pointer'
        if (e.features.length > 0) {
          if (hoveredStateId) {
            map.current.setFeatureState(
              { source: 'bangalore', id: hoveredStateId },
              { hover: false }
            );
          }
          hoveredStateId = e.features[0].id;
          map.current.setFeatureState(
            { source: 'bangalore', id: hoveredStateId },
            { hover: true }
          );
          const coordinates = e.features[0].geometry.coordinates[0][0];
          popup.setLngLat(coordinates).setHTML(popupText(e.features[0])).addTo(map.current);
        }
      });

      // When the mouse leaves the state-fill layer, update the feature state of the
      // previously hovered feature.
      map.current.on('mouseleave', 'bangalore-fill', () => {
        if (hoveredStateId) {
          map.current.setFeatureState(
            { source: 'bangalore', id: hoveredStateId },
            { hover: false }
          );
        }
        hoveredStateId = null;
        map.current.getCanvas().style.cursor = '';
      });

    })
  }, []);

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
