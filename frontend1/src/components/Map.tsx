import React, { useEffect, useRef, useState } from "react";
import maplibregl, { Map as MapLibreMap, Marker } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const MapContainer: React.FC<{ employeeId: string }> = ({ employeeId }) => {
    const mapContainer = useRef<HTMLDivElement | null>(null);
    const mapRef = useRef<MapLibreMap | null>(null);
    const markerRef = useRef<Marker | null>(null);
    
    const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);

    useEffect(() => {
        const socket = new WebSocket("ws://localhost:8080");

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log("neeru location for employee " + employeeId + " " + data.employeeId + " " + data.latitude + " " + data.longitude)

            if (data.employeeId === employeeId) {
                const { latitude, longitude } = data;

                if (!mapRef.current) {
                    mapRef.current = new maplibregl.Map({
                        container: mapContainer.current!,
                        center: [longitude, latitude],
                        zoom: 15,
                        style: "https://api.olamaps.io/tiles/vector/v1/styles/default-light-standard/style.json",
                            transformRequest: (url, resourceType) => {
                                url = url.replace("app.olamaps.io", "api.olamaps.io");

                                if (url.includes("?")) {
                                    url = url + "&api_key=";
                                } else {
                                    url = url + "?api_key=";
                                }
                                return { url, resourceType };
                            },
                    });

                    markerRef.current = new maplibregl.Marker()
                        .setLngLat([longitude, latitude])
                        .addTo(mapRef.current);
                } else {
                    markerRef.current!.setLngLat([longitude, latitude]);
                    mapRef.current.setCenter([longitude, latitude]);
                }
            }
        };

        return () => {
            socket.close(); // Clean up WebSocket connection
        };
    }, [employeeId]);

    return (
        <div
            ref={mapContainer}
            className="w-full h-full"
        />
    );
}

export default MapContainer;