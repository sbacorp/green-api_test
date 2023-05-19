import { useContext, useEffect, useState } from "react";
import { IContactData } from "@/pages/api/getContacts";
import { AuthContext } from "@/lib/authContext";
import fetchContacts from "@/lib/fetchContacts";
import { ChatContext } from "@/lib/chatContext";
import Contact from "./Contact";

const ContactsList = () => {
	const { idInstance, apiTokenInstance } = useContext(AuthContext);
	const { setActiveChat } = useContext(ChatContext);
	const [contacts, setContacts] = useState<IContactData[]>([]);
	useEffect(() => {
		if (idInstance) {
			fetchContacts({ idInstance, apiTokenInstance, setContacts });
		}
	}, [idInstance]);
	if (!contacts) return <p>Список контактов пуст</p>;
	return (
		<div className="contacts">
			{contacts
				.filter((el) => el.type !== "group")
				.map((el, i) => (
					<Contact key={i} contact={el} setActiveChat={setActiveChat} />
				))}
		</div>
	);
};

export default ContactsList;
