import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { AuthProvider } from "@/lib/authContext";
import { ChatProvider } from "@/lib/chatContext";
import { ChatsHistoryProvider } from "@/lib/chatsHistoryContext";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<AuthProvider>
			<ChatsHistoryProvider>
				<ChatProvider>
					<div className="wrapper">
						<Component {...pageProps} />
					</div>
				</ChatProvider>
			</ChatsHistoryProvider>
		</AuthProvider>
	);
}
