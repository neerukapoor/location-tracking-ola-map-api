import React, { useEffect, useRef } from 'react';
import maplibregl, { Map as MapLibreMap, Marker } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

interface MapProps {
  latitude: number;
  longitude: number;
}

const Map: React.FC<MapProps> = ({ latitude, longitude }) => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  const markerRef = useRef<Marker | null>(null);
  const geojsonRef = useRef<GeoJSON.FeatureCollection<GeoJSON.Geometry>>({
    type: "FeatureCollection",
    features: [{
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: []
      },
      properties: {}
    }]
  });

  useEffect(() => {
    if (mapContainer.current) {
      mapRef.current = new maplibregl.Map({
        container: mapContainer.current,
        center: [longitude, latitude],
        zoom: 15,
        style: "https://api.olamaps.io/tiles/vector/v1/styles/default-light-standard/style.json",
        transformRequest: (url, resourceType) => {
        // Replace the wrong URL with the correct one
        url = url.replace("app.olamaps.io", "api.olamaps.io");

        // Add the API key to the URL based on existing parameters
        if (url.includes("?")) {
            url = url + "&api_key=";
        } else {
            url = url + "?api_key=";
        }
        return { url, resourceType };
        },
      });

      markerRef.current = new maplibregl.Marker().setLngLat([longitude, latitude]).addTo(mapRef.current);

      // mapRef.current.on('load', () => {
      //   mapRef.current!.addSource('route', {
      //     type: 'geojson',
      //     data: geojsonRef.current
      //   });

      //   mapRef.current!.addLayer({
      //     id: 'route',
      //     type: 'line',
      //     source: 'route',
      //     layout: {
      //       'line-join': 'round',
      //       'line-cap': 'round',
      //     },
      //     paint: {
      //       'line-color': '#FF0000',
      //       'line-width': 2,
      //     },
      //   });
      // });

      return () => mapRef.current!.remove();
    }
  }, []);

  // useEffect(() => {
  //   if (mapRef.current && markerRef.current) {
  //       markerRef.current.setLngLat([longitude, latitude]);
  
  //       const lineString = geojsonRef.current.features[0].geometry;
  //       if (lineString.type === 'LineString') {
  //         lineString.coordinates.push([longitude, latitude]);
  //       }
  //       const source = mapRef.current.getSource('route') as maplibregl.GeoJSONSource | undefined;
  //       if (source) {
  //           source.setData(geojsonRef.current);
  //       }
  //     }
  // }, [latitude, longitude]);

  useEffect(() => {
    if (mapRef.current && markerRef.current) {
      markerRef.current.setLngLat([longitude, latitude]);
    }
  }, [latitude, longitude]);

  return <div id="central-map" ref={mapContainer} style={{ height: '100vh', width: '100%' }} />;
};

export default Map;