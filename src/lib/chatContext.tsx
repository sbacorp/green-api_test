import React, {createContext, ReactNode, useState} from "react";
import {IContactData} from "@/pages/api/getContacts";
import {AuthContext} from "@/lib/authContext";


interface ChatContextProps {
    activeChat: IContactData,
    setActiveChat: (activeChat: IContactData) => void
}

const ChatContext = createContext<ChatContextProps>({} as ChatContextProps);

const ChatProvider = ({children}: { children: ReactNode }) => {
    const [activeChat, setActiveChat] = useState<IContactData | null>(null)
    setActiveChat(null)
    return (
        <AuthContext.Provider
            value={{isAuth, setIsAuth, idInstance, apiTokenInstance, setIdInstance, setApiTokenInstance}}>
    {children}
    </AuthContext.Provider>
    )
};

export {ChatContext, ChatProvider};