import { useContext, useEffect, useState } from "react";
import { IContactData } from "@/pages/api/getContacts";
import { AuthContext } from "@/lib/authContext";
import fetchContacts from "@/lib/fetchContacts";
import { ChatContext } from "@/lib/chatContext";

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
					<div className="contact" key={i} onClick={() => setActiveChat(el)}>
						<p className="contact__name">{el.name}</p>
						<p className="contact__number">{el.id.split("@")[0]}</p>
					</div>
				))}
		</div>
	);
};

export default ContactsList;
