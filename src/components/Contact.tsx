import React from "react";
import { IContactData } from "@/pages/api/getContacts";

function Contact({
	contact,
	setActiveChat,
}: {
	contact: IContactData;
	setActiveChat: (contact: IContactData) => void;
}) {
	return (
		<div className="contact" onClick={() => setActiveChat(contact)}>
			<p className="contact__name">{contact.name}</p>
			<p className="contact__number">+{contact.id.split("@")[0]}</p>
		</div>
	);
}

export default Contact;
