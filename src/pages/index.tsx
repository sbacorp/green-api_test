import Head from "next/head";
import { AuthContext } from "@/lib/authContext";
import { useContext, useEffect, useState } from "react";
import Aside from "@/components/Aside";
import { ChatContext } from "@/lib/chatContext";
import axios from "axios";
import { IReceiveNotification } from "@/pages/api/ReceiveNotification";

type SendedMessage = {
	chatId: string;
	message: string;
	time: string;
};
export default function Home() {
	const { idInstance, apiTokenInstance } = useContext(AuthContext);
	const { activeChat } = useContext(ChatContext);
	const [message, setMessage] = useState<string>("");
	const PollingInterval = 10000;
	const [notifications, setNotifications] = useState<
		Array<IReceiveNotification | SendedMessage>
	>([]);

	const sendMessage = async () => {
		if (activeChat) {
			try {
				const response = await axios.post("/api/sendNotification", {
					idInstance: idInstance,
					apiTokenInstance: apiTokenInstance,
					chatId: activeChat.id,
					message: message,
				});
				console.log(response.data);
				setNotifications((n) => [
					...n,
					{
						chatId: activeChat.id,
						message: message,
						time: new Date().toLocaleTimeString(),
					},
				]);
			} catch (e) {
				console.log(e);
			}
		}
		setMessage("");
	};

	const pollingNotifications = async () => {
		if (activeChat) {
			try {
				const response = await axios.get("/api/ReceiveNotification", {
					params: {
						idInstance: idInstance,
						apiTokenInstance: apiTokenInstance,
					},
				});

				if (
					response.data &&
					response.data.body.messageData.typeMessage === "textMessage"
				)
					setNotifications((notifications) => [
						...notifications,
						response.data.body,
					]);
			} catch (e) {
				console.log(e);
			}
		}
	};

	useEffect(() => {
		if (activeChat) {
			const intervalId = setInterval(pollingNotifications, PollingInterval);
			return () => {
				clearInterval(intervalId);
			};
		}
	}, [activeChat]);

	return (
		<>
			<Head>
				<title>GreenAPI TEST</title>
				<meta name="description" content="Test task for green api vacancy" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className="main">
				<Aside />
				<div className="chat">
					{activeChat ? (
						<>
							<header className="chat__header">
								<p className="contact__name">
									{activeChat.name ? activeChat.name : '+'+activeChat.id.split('@')[0]}
								</p>
							</header>
							<div className="chat__main">
								{notifications &&
									notifications
										.filter(
											(el) =>
												("messageData" in el &&
													el.senderData &&
													el.senderData.chatId === activeChat.id) ||
												("chatId" in el && el.chatId === activeChat.id)
										)
										.map((el, i) =>
											"messageData" in el ? (
												<div className="chat__notification left" key={i}>
													<p>{el.messageData.textMessageData.textMessage}</p>

													<span>{`${
														new Date(el.timestamp).getHours() - 2
													}:${new Date(el.timestamp).getMinutes()}`}</span>
												</div>
											) : (
												<div className="chat__notification right" key={i}>
													{el.message}
													<span>{el.time}</span>
												</div>
											)
										)}
							</div>
							<div className="chat__send">
								<input
									onKeyDown={(e) =>
										message && e.key === "Enter" && sendMessage()
									}
									value={message}
									onChange={(e) => setMessage(e.target.value)}
									type="text"
									placeholder="Введите сообщение"
								/>
								<button
									onClick={() => {
										sendMessage();
									}}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										height="24"
										viewBox="0 96 960 960"
										width="24"
										fill="currentColor"
									>
										<path d="M140.001 865.998V286.002L828.458 576 140.001 865.998ZM200 776l474-200-474-200v147.693L416.921 576 200 628.307V776Zm0 0V376v400Z" />
									</svg>
								</button>
							</div>
						</>
					) : (
						<p className="chat__empty">Выберите чат чтобы начать переписку</p>
					)}
				</div>
			</main>
		</>
	);
}
