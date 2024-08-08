import { ReactNode, createContext, useContext, useState } from "react"


interface AuthContextType {
    authUser: any;
    setAuthUser: (user: any) => void;
}

interface AuthContextProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthContext = () => {
    const user = useContext(AuthContext);

    if(user === undefined) {
        throw new Error("useAuthContext must be used with a AuthContext")
    }
    return user;
}

export const AuthContextProvider = ({children}: AuthContextProviderProps) => {
    const storedToken = localStorage.getItem("token");
    const [authUser, setAuthUser] = useState(storedToken || null);

    return <AuthContext.Provider value={{authUser, setAuthUser}}>{children}</AuthContext.Provider>
};