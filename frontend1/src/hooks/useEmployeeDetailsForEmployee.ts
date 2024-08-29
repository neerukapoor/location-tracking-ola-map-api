import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
import { useEmployeeAuthContext } from "../context/EmployeeAuthContext";
import { useEmployeeDetailsForEmployeeContext } from "../context/EmployeeDetailsForEmployee";

export const useEmployeeDetailsForEmployee = () => {
    const [loading, setLoading] = useState(false);
    const {employeeAuthUser} = useEmployeeAuthContext();
    const {employeeDetailsForEmployee, setEmployeeDetailsForEmployee} = useEmployeeDetailsForEmployeeContext();
    const query = new URLSearchParams(useLocation().search);
    const uniqueId = query.get("uniqueId");
    const backendEndpoint = import.meta.env.REACT_APP_BACKEND_ENDPOINT
    
    useEffect(() => {
        const getEmployeeDetailsForEmployee = async () => {
            setLoading(true);
            try {
                const res = await fetch(`${backendEndpoint}/employee/employeeDetails?uniqueId=${uniqueId}`, {
                    method: "GET",
                    headers: {"Content-Type" : "application/json",
                        "jwtToken": JSON.parse(employeeAuthUser)
                    }
                })
                const data = await res.json();
                if(data.error) {
                    throw new Error(data.error)
                }
                console.log("neeru in useEmployeeDetailsForEmployee " + data.id + " " + data.uniqueId)
                setEmployeeDetailsForEmployee(data)
            }
            catch (e) {
                if (e instanceof Error) {
                    toast.error(e.message);
                } else {
                    toast.error("An unknown error occurred while showing Employees details for employee");
                }
            } finally {
                setLoading(false);
            }
        }
        getEmployeeDetailsForEmployee();
    },[uniqueId, employeeAuthUser])
    return {loading, employeeDetailsForEmployee}
}