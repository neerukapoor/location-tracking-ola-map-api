import React, { useEffect, useRef, useState } from "react";
import maplibregl, { Map as MapLibreMap } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useDateContext } from "../context/DateContext";
import { useAuthContext } from "../context/AuthContext";

interface Location {
    timestamp: Date;
    latitude: number;
    longitude: number;
}

const HistoryMap: React.FC<{ employeeId: string }> = ({ employeeId }) => {
    const { selectedDate } = useDateContext();
    const mapContainer = useRef<HTMLDivElement | null>(null);
    const mapRef = useRef<MapLibreMap | null>(null);
    const [locations, setLocations] = useState<Location[]>([]);
    const {authUser} = useAuthContext();
    const mapApiKey = import.meta.env.REACT_APP_OLA_MAP_API_KEY;
    const backendEndpoint = import.meta.env.REACT_APP_BACKEND_ENDPOINT

    useEffect(() => {
        const fetchLocationHistory = async () => {
            if (!selectedDate) return;

            const dateStr = selectedDate.toISOString().split('T')[0]; // Format the date as YYYY-MM-DD

            try {
                const response = await fetch(
                    `${backendEndpoint}/locationHistory?employeeId=${employeeId}&date=${dateStr}` , {
                        method: "GET",
                        headers: {"Content-Type" : "application/json",
                            "jwtToken": JSON.parse(authUser)
                        },
                    }
                );
                const data = await response.json();
                console.log("neeru in history map - " + data.locations)
                setLocations(data.locations);
            } catch (error) {
                console.error('Failed to fetch location history', error);
            }
        };

        fetchLocationHistory();
    }, [employeeId, selectedDate]);

    useEffect(() => {
        if (mapContainer.current && locations.length > 0) {
            mapRef.current = new maplibregl.Map({
                container: mapContainer.current!,
                center: [locations[0].longitude, locations[0].latitude],
                zoom: 15,
                style: "https://api.olamaps.io/tiles/vector/v1/styles/default-light-standard/style.json",
                transformRequest: (url, resourceType) => {
                    url = url.replace("app.olamaps.io", "api.olamaps.io");

                    if (url.includes("?")) {
                        url = url + `&api_key=${mapApiKey}`;
                    } else {
                        url = url + `?api_key=${mapApiKey}`;
                    }
                    return { url, resourceType };
                },
            });

            const coordinates: [number, number][] = locations.map((loc) => [loc.longitude, loc.latitude]);

            const lineString: GeoJSON.Feature<GeoJSON.LineString> = {
                type: "Feature",
                geometry: {
                    type: "LineString",
                    coordinates: coordinates,
                },
                properties: {},
            };

            mapRef.current.on('load', () => {
                mapRef.current!.addSource('route', {
                    type: 'geojson',
                    data: lineString,
                });

                mapRef.current!.addLayer({
                    id: 'route',
                    type: 'line',
                    source: 'route',
                    layout: {
                        'line-join': 'round',
                        'line-cap': 'round',
                    },
                    paint: {
                        'line-color': '#FF0000',
                        'line-width': 2,
                    },
                });

                // Add marker for the start of the route
                new maplibregl.Marker({ color: 'green' })
                    .setLngLat(coordinates[0])
                    .addTo(mapRef.current!);

                // Add marker for the end of the route
                new maplibregl.Marker({ color: 'red' })
                    .setLngLat(coordinates[coordinates.length - 1])
                    .addTo(mapRef.current!);
            });
        }
    }, [locations]);

    return <div ref={mapContainer} className="w-full h-full" />;
};

export default HistoryMap;
