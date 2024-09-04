import { ReactNode, createContext, useContext, useState } from "react"

interface EmployeeDetailsForEmployeeInterface {
    id: string,
    name: string,
}

interface EmployeeDetailsForEmployeeContextType {
    employeeDetailsForEmployee: EmployeeDetailsForEmployeeInterface | null;
    setEmployeeDetailsForEmployee: (user: EmployeeDetailsForEmployeeInterface) => void;
}

interface EmployeeDetailsForEmployeeContextProviderProps {
    children: ReactNode;
}

export const EmployeeDetailsForEmployeeContext = createContext<EmployeeDetailsForEmployeeContextType | undefined>(undefined);

export const useEmployeeDetailsForEmployeeContext = () => {
    const user = useContext(EmployeeDetailsForEmployeeContext);

    if(user === undefined) {
        throw new Error("useEmployeeDetailsForEmployeeContext must be used with an EmployeeDetailsForEmployeeContext")
    }
    return user;
}

export const EmployeeDetailsForEmployeeContextProvider = ({children}: EmployeeDetailsForEmployeeContextProviderProps) => {
    const [employeeDetailsForEmployee, setEmployeeDetailsForEmployee] = useState<EmployeeDetailsForEmployeeInterface | null>(null);

    return <EmployeeDetailsForEmployeeContext.Provider value={{employeeDetailsForEmployee, setEmployeeDetailsForEmployee}}>{children}</EmployeeDetailsForEmployeeContext.Provider>
};