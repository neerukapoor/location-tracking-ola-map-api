import { useState, useEffect } from "react";
import { useEmployeeDetailsForEmployeeContext } from "../context/EmployeeDetailsForEmployee";

const EmployeeLocationTracker  = () => {
    const [tracking, setTracking] = useState(false);
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const {employeeDetailsForEmployee} = useEmployeeDetailsForEmployeeContext();
    const webSocketEndpoint = import.meta.env.REACT_APP_WEBSOCKET_ENDPOINT;
     
    useEffect(() => {
        const socketInstance = new WebSocket(`${webSocketEndpoint}`);
        setSocket(socketInstance);

        return () => {
            if (socketInstance) {
                socketInstance.close();
            }
        };
    }, []);

    const startTracking = () => {
        if (!("geolocation" in navigator)) {
            alert("Geolocation is not available in your browser");
            return;
        }

        setTracking(true);

        const employeeId = employeeDetailsForEmployee?.id
        navigator.geolocation.watchPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                console.log("neeru in employeetracker " + "- " + employeeDetailsForEmployee?.id + " -" + latitude + " " + longitude)
                if (socket && socket.readyState === WebSocket.OPEN) {
                    socket.send(
                        JSON.stringify({
                            employeeId,
                            latitude,
                            longitude,
                        })
                    );
                }
            },
            (error) => {
                console.error("Error getting location:", error);
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0,
            }
        );
    };

    const stopTracking = () => {
        setTracking(false);
        if (socket) {
            socket.close(); // Close the socket connection when stopping tracking
        }
    };

    return (
        <div className="flex flex-col items-center">
            <button className="btn btn-primary" onClick={startTracking} disabled={tracking}>
                Start Tracking
            </button>
            <button className="btn btn-secondary mt-4" onClick={stopTracking} disabled={!tracking}>
                End Tracking
            </button>
        </div>
    );
};

export default EmployeeLocationTracker;
