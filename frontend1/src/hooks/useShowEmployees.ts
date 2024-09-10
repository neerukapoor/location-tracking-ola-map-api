import { useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import { useRegisteredEmployeesContext } from "../context/RegisteredEmployeesContext";

export const useShowEmployees = () => {
    const [loading, setLoading] = useState(false);
    const {authUser} = useAuthContext();
    const {registeredEmployees, setRegisteredEmployees} = useRegisteredEmployeesContext();
    const backendEndpoint = import.meta.env.REACT_APP_BACKEND_ENDPOINT

    useEffect(() => { 
        const getRegisteredEmployees = async () => {
            if (!authUser) return; // Ensure authUser is available
            setLoading(true);
            try {
                const res = await fetch(`${backendEndpoint}/admin/showEmployee`, {
                    method: "GET",
                    headers: {"Content-Type": "application/json",
                        "jwtToken": JSON.parse(authUser)
                    }
                })
                const data = await res.json();
                if(data.error) {
                    throw new Error(data.error)
                }
                setRegisteredEmployees(data.employees)
            } catch (e) {
                if (e instanceof Error) {
                    toast.error(e.message);
                } else {
                    toast.error("An unknown error occurred while showing Employees details");
                }
            } finally {
                setLoading(false);
            }
        }
        getRegisteredEmployees();
    },[authUser])

    return {loading, registeredEmployees}
}