import { useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";

interface EmployeeInterface {
    name: string,
    uniqueId: string,
    mobileNumber: string
}

export const useEmployeeDetails = () => {
    const [loading, setLoading] = useState(false);
    const {authUser} = useAuthContext();
    const [employeeDetails, setEmployeeDetails] = useState<EmployeeInterface | null>(null);
    const query = new URLSearchParams(useLocation().search);
        const uniqueId = query.get("uniqueId");
    
    useEffect(() => {
        const getEmployeeDetails = async () => {
            setLoading(true);
            try {
                const res = await fetch(`http://localhost:5000/admin/employeeDetails?uniqueId=${uniqueId}`, {
                    method: "GET",
                    headers: {"Content-Type" : "application/json",
                        "jwtToken": JSON.parse(authUser)
                    }
                })
                const data = await res.json();
                if(data.error) {
                    throw new Error(data.error)
                }
                setEmployeeDetails(data)
            }
            catch (e) {
                if (e instanceof Error) {
                    toast.error(e.message);
                } else {
                    toast.error("An unknown error occurred while showing Employees details");
                }
            } finally {
                setLoading(false);
            }
        }
        getEmployeeDetails();
    },[])
    return {loading, employeeDetails}
}