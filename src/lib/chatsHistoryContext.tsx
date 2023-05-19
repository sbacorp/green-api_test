import React, { createContext, useState, useEffect, ReactNode } from "react";
import { IContactData } from "@/pages/api/getContacts";

interface ChatsHistoryContextProps {
	chatsHistory: IContactData[];
	updateChatsHistory: (newChat: IContactData) => void;
}
export const ChatsHistoryContext = createContext<ChatsHistoryContextProps>(
	{} as ChatsHistoryContextProps
);

// Компонент-обертка для предоставления контекста
export const ChatsHistoryProvider = ({ children }: { children: ReactNode }) => {
	const [chatsHistory, setChatsHistory] = useState<IContactData[]>([]);

	// Получение истории просмотренных контактов из localStorage при монтировании компонента
	useEffect(() => {
		const storedChatsHistory = localStorage.getItem("chatsHistory");
		if (storedChatsHistory) {
			setChatsHistory(JSON.parse(storedChatsHistory));
		}
	}, []);

	const updateChatsHistory = (newChat: IContactData) => {
		setChatsHistory((prevHistory: IContactData[]) => {
			const updatedHistory = [...prevHistory, newChat];
			localStorage.setItem("chatsHistory", JSON.stringify(updatedHistory));
			return updatedHistory;
		});
	};

	return (
		<ChatsHistoryContext.Provider value={{ chatsHistory, updateChatsHistory }}>
			{children}
		</ChatsHistoryContext.Provider>
	);
};
