import { ReactNode, createContext, useContext, useState, Dispatch, SetStateAction } from "react"

interface AdminContextType {
    adminName: string | null;
    setAdminName: Dispatch<SetStateAction<string | null>>;
}

interface AdminContextProviderProps {
    children: ReactNode;
}

export const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const useAdminContext = () => {
    const admin = useContext(AdminContext);

    if(admin === undefined) {
        throw new Error("useAdminContext must be used with a AdminContext")
    }
    return admin;
}

export const AdminContextProvider = ({children}: AdminContextProviderProps) => {
    const [adminName, setAdminName] = useState<string | null>(null);

    return <AdminContext.Provider value={{adminName, setAdminName}}>{children}</AdminContext.Provider>
};