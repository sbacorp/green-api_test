import React, {createContext, ReactNode, useEffect, useState} from 'react';
import {useRouter} from "next/router";

interface AuthContextProps {
    isAuth: boolean;
    setIsAuth: (isAuth: boolean) => void;
    setIdInstance: (idInstance: string) => void;
    setApiTokenInstance: (apiTokenInstance: string) => void;
    idInstance: string;
    apiTokenInstance: string
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);


const AuthProvider = ({children}: { children: ReactNode }) => {
    const router = useRouter()
    const [isAuth, setIsAuth] = useState<boolean>(false);
    const [idInstance, setIdInstance] = useState<string>('');
    const [apiTokenInstance, setApiTokenInstance] = useState<string>('');
    useEffect(() => {
        const idInstance = localStorage.getItem('idInstance');
        const apiTokenInstance = localStorage.getItem('apiTokenInstance');
        const user = !!idInstance && !!apiTokenInstance;
        if(user){
            setIsAuth(true);
            setIdInstance(idInstance)
            setApiTokenInstance(apiTokenInstance)
        }
        if (!user) {
            router.push('/login');
        }
    }, []);
    return (
        <AuthContext.Provider
            value={{isAuth, setIsAuth, idInstance, apiTokenInstance, setIdInstance, setApiTokenInstance}}>
            {children}
        </AuthContext.Provider>
    );
};

export {AuthContext, AuthProvider};
