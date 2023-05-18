import {NextApiRequest, NextApiResponse} from 'next';
import axios from 'axios';

const sendNotification = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const {idInstance, apiTokenInstance, chatId, message} = req.body;

        const url = `https://api.green-api.com/waInstance${idInstance}/SendMessage/${apiTokenInstance}`;

        const response = await axios.post(url, {
            chatId,
            message,
        });

        const {idMessage} = response.data;

        res.status(200).json({idMessage});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Ошибка при отправке сообщения'});
    }
};

export default sendNotification;
