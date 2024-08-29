import { useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import { useAdminContext } from "../context/AdminContext";

export const useAdminName = () => {
    const [loading, setLoading] = useState(false);
    const {authUser} = useAuthContext();
    const {adminName, setAdminName} = useAdminContext();
    const backendEndpoint = import.meta.env.REACT_APP_BACKEND_ENDPOINT

    useEffect(() => { 
        const getLoggedInAdminName = async () => {
            setLoading(true);
            try {
                const res = await fetch(`${backendEndpoint}/admin/name`, {
                    method: "GET",
                    headers: {"Content-Type": "application/json",
                        "jwtToken": JSON.parse(authUser)
                    }
                })
                const data = await res.json();
                if(data.error) {
                    throw new Error(data.error)
                }
                setAdminName(data)
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
        getLoggedInAdminName();
    },[])

    return {loading, adminName}
}