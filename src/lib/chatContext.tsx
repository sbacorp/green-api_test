import React, {createContext, ReactNode, useState} from "react";
import {IContactData} from "@/pages/api/getContacts";


interface ChatContextProps {
    activeChat: IContactData | null,
    setActiveChat: (activeChat: IContactData|null) => void
}

const ChatContext = createContext<ChatContextProps>({} as ChatContextProps);

const ChatProvider = ({children}: { children: ReactNode }) => {
    const [activeChat, setActiveChat] = useState<IContactData | null>(null)
    return (
        <ChatContext.Provider
            value={{activeChat, setActiveChat}}>
            {children}
        </ChatContext.Provider>
    )
};

export {ChatContext, ChatProvider};