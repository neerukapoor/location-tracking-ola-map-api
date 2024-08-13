import { useState } from "react";
import toast from "react-hot-toast"
import { useAuthContext } from "../context/AuthContext";

interface SignupParams {
    adminname: string;
    password: string;
}

const useSignup = () => {
    const [loading, setLoading] = useState(false);
    const {setAuthUser} = useAuthContext();

    const signup = async({adminname, password}: SignupParams) => {
        const success = handleInputErrors({adminname, password})
        if(!success)
            return;
    
        setLoading(true)
        try {
            const res = await fetch("http://localhost:5000/admin/auth/signup", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({adminname, password})
            })

            const data = await res.json();
            if(data.error) {
                throw new Error(data.error)
            }
            localStorage.setItem("jwtToken", JSON.stringify(data.token))
            setAuthUser(data.token)
        } catch (e) {
            if (e instanceof Error) {
                toast.error(e.message);
            } else {
                toast.error("An unknown error occurred while signing up");
            }
        } finally {
            setLoading(false)
        }
    }

    return {loading, signup}
}

export default useSignup;

function handleInputErrors({adminname, password}: SignupParams) {
    if(!adminname || !password) {
        toast.error("Please fill in all fields.")
        return false;
    }
    return true
}