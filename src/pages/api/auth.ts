import {NextApiRequest, NextApiResponse} from 'next';
import axios from 'axios';

type Data = {
    message: string
};

interface IAuth {
    idInstance: string,
    apiTokenInstance: string
}

const auth = async ({idInstance, apiTokenInstance}: IAuth) => {
    try {
        const res = await axios.get(
            `https://api.green-api.com/waInstance${idInstance}/getStateInstance/${apiTokenInstance}`
        );
        return res.data;
    } catch (error) {
        console.log(error);
        throw new Error('Ошибка авторизации, проверьте данные');
    }
};
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    try {
        const {idInstance, apiTokenInstance} = req.body;
        // Ваш код для получения данных с использованием idInstance и apiTokenInstance
        // Например, можно использовать вашу функцию getData
        const data = await auth({idInstance, apiTokenInstance});
        console.log(data)
        res.status(200).json({message: 'Успешно'});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Ошибка авторизации, проверьте данные'});
    }
}



