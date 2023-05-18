import Head from 'next/head'
import {FormEvent, useContext, useState} from "react";
import axios from "axios";
import {useRouter} from "next/router";
import {AuthContext} from '../lib/authContext'

export default function Login() {
    const {idInstance, setIdInstance, apiTokenInstance, setApiTokenInstance} = useContext(AuthContext);
    // const [idInstance, setIdInstance] = useState('');
    // const [apiTokenInstance, setApiTokenInstance] = useState('');
    const [message, setMessage] = useState('');
    const router = useRouter();
    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            try {
                const response = await axios.post('/api/auth', {
                    idInstance: idInstance,
                    apiTokenInstance: apiTokenInstance,
                });
                setMessage(response.data.message);
                if (response.status === 200) {
                    localStorage.setItem('idInstance', idInstance);
                    localStorage.setItem('apiTokenInstance', apiTokenInstance);
                    setIdInstance(idInstance)
                    setApiTokenInstance(apiTokenInstance)
                    router.push('/')

                }

            } catch
                (error) {
                setMessage('Ошибка авторизации, проверьте данные');
            }

        }
    ;
    return (
        <>
            <Head>
                <title>Login</title>
                <meta name="description" content="login page"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <form className='login' onSubmit={e => onSubmit(e)}>
                <p className="login__text">Ввведите данные для входа, полученные на <a
                    href="https://green-api.com">Green API</a></p>
                <input type="text" className='login__input' value={idInstance}
                       onChange={(e) => setIdInstance(e.target.value)}
                       placeholder='Введите idInstance'/>
                <input type="text" className='login__input' value={apiTokenInstance}
                       onChange={(e) => setApiTokenInstance(e.target.value)}
                       placeholder='Введите apiTokenInstance'/>
                <button type='submit' className='login__submit'>Авторизоваться</button>
                {
                    message && <p className="login__message">{message}</p>
                }
            </form>
        </>
    )
}
