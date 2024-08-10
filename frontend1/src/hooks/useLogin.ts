import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

interface LoginParams {
    adminname: string,
    password: string
}

const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const {setAuthUser} = useAuthContext();

    const login = async ({adminname, password}: LoginParams) => {
        const success = handleInputErrors({adminname, password})

        if (!success) 
            return;
        setLoading(true);
        
        try {
            const res = await fetch("http://localhost:5000/admin/auth/login", {
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify({adminname, password})
            })
            const data = await res.json();
            console.log("neeru In useLogin" + data.token)
            localStorage.setItem("jwtToken", JSON.stringify(data.token));
            setAuthUser(data.token)
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

function handleInputErrors({adminname, password}: LoginParams) {
    if(!adminname || !password) {
        toast.error("Please fill in all fields.")
        return false;
    }
    return true
}