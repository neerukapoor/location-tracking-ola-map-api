import { useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import { useRegisteredEmployeesContext } from "../context/RegisteredEmployeesContext";

export const useShowEmployees = () => {
    const [loading, setLoading] = useState(false);
    const {authUser} = useAuthContext();
    const {registeredEmployees, setRegisteredEmployees} = useRegisteredEmployeesContext();

    useEffect(() => { 
        const getRegisteredEmployees = async () => {
            setLoading(true);
            try {
                const res = await fetch("http://localhost:5000/admin/showEmployee", {
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
    },[])

    return {loading, registeredEmployees}
}