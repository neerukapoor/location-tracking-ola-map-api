import { useState } from "react";
import toast from "react-hot-toast";
import { useEmployeeAuthContext } from "../context/EmployeeAuthContext";

interface LoginParams {
    uniqueId: string,
    password: string
}

const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const {setEmployeeAuthUser} = useEmployeeAuthContext();

    const login = async ({uniqueId, password}: LoginParams) => {
        const success = handleInputErrors({uniqueId, password})

        if (!success) 
            return;
        setLoading(true);
        
        try {
            const res = await fetch("http://localhost:5000/employee/auth/login", {
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify({uniqueId, password})
            })
            const data = await res.json();
            localStorage.setItem("jwtEmployeeToken", JSON.stringify(data.token));
            setEmployeeAuthUser(data.token)
        } catch (e) {
            if (e instanceof Error) {
                toast.error(e.message);
            } else {
                toast.error("An unknown error occurred while loging in");
            }
        } finally {
            setLoading(false);
        }
    }
    
    return {loading, login};
}

export default useLogin;

function handleInputErrors({uniqueId, password}: LoginParams) {
    if(!uniqueId || !password) {
        toast.error("Please fill in all fields.")
        return false;
    }
    return true
}