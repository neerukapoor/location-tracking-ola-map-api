import {useState} from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface LoginParams {
    name: string,
    mobileNumber: string
}

export const useRegisterNewEmployee = () => {
    const [loading, setLoading] = useState(false);
    const {authUser} = useAuthContext();
    const navigate = useNavigate();
    const backendEndpoint = import.meta.env.REACT_APP_BACKEND_ENDPOINT

    const registerNewEmployee = async ({name, mobileNumber}: LoginParams) => {
        const success = handleInputErrors({name, mobileNumber});
        if (!success) 
            return;
        
        setLoading(true);
        
        try {
            const res = await fetch(`${backendEndpoint}/admin/registerEmployee` , {
                method: "POST",
                headers: {"Content-Type" : "application/json",
                    "jwtToken": JSON.parse(authUser)
                },
                body: JSON.stringify({name, mobileNumber})
            })
            const data = await res.json();
            if(data.message === "Employee registered successfully"){
                toast("Employee Registered Successfully")
                navigate("/");
            }
            else {
                toast.error(data.message || "Registration failed");
            }
        } catch (err) {
            if (err instanceof Error) {
                toast.error(err.message);
            } else {
                toast.error("An unknown error occurred while loging in");
            }
        } finally {
            setLoading(false);
        }
    }
    return {loading, registerNewEmployee}
}

function handleInputErrors({name, mobileNumber}: LoginParams) {
    if(!name || !mobileNumber) {
        toast.error("Please fill in all fields.")
        return false;
    }
    const mobileNumberPattern = /^[0-9]{10}$/;
    toast("here Please enter a valid mobile number.");
    if (!mobileNumberPattern.test(mobileNumber)) {
        // later change this to toast as currently don't know but its not working.
        alert("Please enter a valid mobile number.")
        return false;
    }
    return true
}

