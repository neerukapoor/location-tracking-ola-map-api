import { ReactNode, createContext, useContext, useState } from "react"

interface EmployeeDetailsInterface {
    id: string,
    name: string,
    uniqueId: string,
    mobileNumber: string
}

interface EmployeeDetailsContextType {
    employeeDetails: EmployeeDetailsInterface | null;
    setEmployeeDetails: (user: EmployeeDetailsInterface) => void;
}

interface EmployeeAuthContextProviderProps {
    children: ReactNode;
}

export const EmployeeDetailsContext = createContext<EmployeeDetailsContextType | undefined>(undefined);

export const useEmployeeDetailsContext = () => {
    const user = useContext(EmployeeDetailsContext);

    if(user === undefined) {
        throw new Error("useEmployeeDetailsContext must be used with an EmployeeDetailsContext")
    }
    return user;
}

export const EmployeeDetailsContextProvider = ({children}: EmployeeAuthContextProviderProps) => {
    const [employeeDetails, setEmployeeDetails] = useState<EmployeeDetailsInterface | null>(null);

    return <EmployeeDetailsContext.Provider value={{employeeDetails, setEmployeeDetails}}>{children}</EmployeeDetailsContext.Provider>
};