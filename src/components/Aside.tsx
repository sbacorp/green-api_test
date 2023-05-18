import React, { useContext, useState } from "react";
import ContactsList from "@/components/contactsList";
import { IContactData } from "@/pages/api/getContacts";
import Contact from "./Contact";
import { ChatContext } from "@/lib/chatContext";

const Aside = () => {
	const { setActiveChat } = useContext(ChatContext);
	const [chatsHistory, setChatsHistory] = useState<IContactData[]>([]);
	const [showContacts, setShowContacts] = useState<boolean>(false);
	return (
		<div className="aside">
			<header className="aside__header">
				<div className="avatar">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						height="40"
						viewBox="0 96 960 960"
						width="40"
					>
						<path
							fill="#aebac1"
							d="M227.036 791.051q58.841-39.348 120.522-60.116Q409.239 710.167 480 710.167q70.761 0 133.054 21.047 62.294 21.047 120.577 59.917 40.442-49.906 58.877-102.744Q810.942 635.55 810.942 576q0-139.764-95.581-235.353t-235.333-95.589q-139.753 0-235.362 95.589Q149.058 436.236 149.058 576q0 59.457 18.652 112.256 18.653 52.799 59.326 102.795Zm252.84-179.884q-59.031 0-99.251-40.316-40.219-40.316-40.219-99.243 0-58.927 40.343-99.239 40.343-40.311 99.375-40.311 59.031 0 99.251 40.435 40.219 40.436 40.219 99.363 0 58.926-40.343 99.118-40.343 40.193-99.375 40.193Zm-.146 371.529q-84.293 0-158.594-31.984-74.3-31.983-129.397-87.316-55.096-55.333-86.765-129.397-31.67-74.063-31.67-158.315t32.018-158.341q32.018-74.089 87.308-129.046 55.29-54.956 129.365-87.054 74.074-32.098 158.338-32.098 84.265 0 158.339 32.098t129.031 87.054q54.956 54.957 87.054 129.137 32.098 74.181 32.098 158.389 0 84.207-32.098 158.232T767.703 863.37q-54.957 55.289-129.223 87.308-74.267 32.018-158.75 32.018Z"
						/>
					</svg>
				</div>
				<button onClick={() => setShowContacts(!showContacts)}>
					<svg
						viewBox="0 0 24 24"
						height="24"
						width="24"
						preserveAspectRatio="xMidYMid meet"
						className=""
						version="1.1"
						x="0px"
						y="0px"
						enableBackground="new 0 0 24 24"
					>
						<path
							fill="currentColor"
							d="M19.005,3.175H4.674C3.642,3.175,3,3.789,3,4.821V21.02 l3.544-3.514h12.461c1.033,0,2.064-1.06,2.064-2.093V4.821C21.068,3.789,20.037,3.175,19.005,3.175z M14.016,13.044H7.041V11.1 h6.975V13.044z M17.016,9.044H7.041V7.1h9.975V9.044z"
						></path>
					</svg>
				</button>
			</header>
			{showContacts && <ContactsList />}
			{chatsHistory.length ? (
				chatsHistory.map((el, i) => (
					<Contact
						key={i}
						contact={el}
						setActiveChat={() => setActiveChat(el)}
					/>
				))
			) : (
				<p>История чатов пуста</p>
			)}
		</div>
	);
};

export default Aside;
