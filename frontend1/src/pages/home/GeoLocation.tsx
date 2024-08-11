// src/pages/GeoLocation.tsx
import React from "react";
import { useLocation } from "react-router-dom";

const GeoLocation: React.FC = () => {
    const query = new URLSearchParams(useLocation().search);
    const uniqueId = query.get("uniqueId");

    return (
        <div className="flex justify-center items-center min-h-screen">
            <h1 className="text-2xl">Hello from GeoLocation</h1>
            {uniqueId && (
                <p className="mt-4 text-lg">
                    You are viewing the details for employee with ID: <strong>{uniqueId}</strong>
                </p>
            )}
        </div>
    );
};

export default GeoLocation;
