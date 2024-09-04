import { ReactNode, createContext, useContext, useState } from "react"

interface EmployeeAuthContextType {
    employeeAuthUser: any;
    setEmployeeAuthUser: (user: any) => void;
}

interface EmployeeAuthContextProviderProps {
    children: ReactNode;
}

export const EmployeeAuthContext = createContext<EmployeeAuthContextType | undefined>(undefined);

export const useEmployeeAuthContext = () => {
    const user = useContext(EmployeeAuthContext);

    if(user === undefined) {
        throw new Error("useEmployeeAuthContext must be used with an EmployeeAuthContext")
    }
    return user;
}

export const EmployeeAuthContextProvider = ({children}: EmployeeAuthContextProviderProps) => {
    const storedToken = localStorage.getItem("jwtEmployeeToken");
    const [employeeAuthUser, setEmployeeAuthUser] = useState(storedToken || null);

    return <EmployeeAuthContext.Provider value={{employeeAuthUser, setEmployeeAuthUser}}>{children}</EmployeeAuthContext.Provider>
};