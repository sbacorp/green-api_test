import '@/styles/globals.scss'
import type {AppProps} from 'next/app'
import {AuthProvider} from "@/lib/authContext";
import {ChatProvider} from "@/lib/chatContext";

export default function App({Component, pageProps}: AppProps) {
    return (
        <AuthProvider>
            <ChatProvider>
                <div className="wrapper">
                    <Component {...pageProps} />
                </div>
            </ChatProvider>
        </AuthProvider>

    )

}
