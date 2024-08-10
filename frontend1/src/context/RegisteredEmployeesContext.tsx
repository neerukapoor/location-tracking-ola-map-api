import { ReactNode, createContext, useContext, useState, Dispatch, SetStateAction } from "react"

interface Employee {
    name: string;
    uniqueId: string;
    password: string;
  }

interface RegisteredEmployeesType {
    registeredEmployees: Employee[];
    setRegisteredEmployees: Dispatch<SetStateAction<Employee[]>>;
}

interface RegisteredEmployeesProviderProps {
    children: ReactNode;
}

export const RegisteredEmployeesContext = createContext<RegisteredEmployeesType | undefined>(undefined);

export const useRegisteredEmployeesContext = () =>{
    const employees = useContext(RegisteredEmployeesContext)

    if(employees === undefined) {
        throw new Error("useRegisteredEmployeesContext must be used with a RegisteredEmployeesContext")
    }
    return employees;
}

export const RegisteredEmployeesProvider = ({children}: RegisteredEmployeesProviderProps) => {
    const [registeredEmployees, setRegisteredEmployees] = useState<Employee[]>([]);

    return <RegisteredEmployeesContext.Provider value={{registeredEmployees, setRegisteredEmployees}}>{children}</RegisteredEmployeesContext.Provider>
}