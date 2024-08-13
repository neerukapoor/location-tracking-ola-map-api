// src/pages/GeoLocation.tsx
import React from "react";
import { useEmployeeDetails } from "../../hooks/useEmployeeDetails";
import MapContainer from "../../components/Map";
import { useNavigate } from "react-router-dom";

const GeoLocation: React.FC = () => {
    const {loading, employeeDetails} = useEmployeeDetails();
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/")
    }

    return (
        <div className="flex flex-col min-h-screen">
            <header className="flex justify-between items-start w-full p-4">
                <h1 className="text-xl font-bold hover:cursor-pointer" onClick={handleClick}>GeoLocation</h1>
                {loading ? (
                    <div className="flex justify-center items-center">
                        <span className="loading loading-spinner"></span>
                    </div>
                ) : (
                    <div className="text-lg text-right">
                        <strong>{employeeDetails?.name}</strong> | {employeeDetails?.mobileNumber}
                    </div>
                )}
            </header>
            <main className="flex-grow mt-4 text-center">
                <MapContainer employeeId="66bb053daa78d1f214016e2c"/>
            </main>
        </div>
    );
};

export default GeoLocation;
