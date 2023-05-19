import React, { useContext } from "react";
import { IContactData } from "@/pages/api/getContacts";
import { ChatsHistoryContext } from "@/lib/chatsHistoryContext";

function Contact({
	contact,
	setActiveChat,
}: {
	contact: IContactData;
	setActiveChat: (contact: IContactData) => void;
}) {
	const { chatsHistory, updateChatsHistory } = useContext(ChatsHistoryContext);
	return (
		<div
			className="contact"
			onClick={() => {
				setActiveChat(contact);
				if (!chatsHistory.includes(contact)) {
					updateChatsHistory(contact);
				}
			}}
		>
			<p className="contact__name">{contact.name}</p>
			<p className="contact__number">+{contact.id.split("@")[0]}</p>
		</div>
	);
}

export default Contact;
