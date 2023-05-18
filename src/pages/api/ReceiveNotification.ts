import {NextApiRequest, NextApiResponse} from 'next';
import axios from 'axios';

const ReceiveNotification = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const {idInstance, apiTokenInstance} = req.body;

        const url = `https://api.green-api.com/waInstance${idInstance}/ReceiveNotification/${apiTokenInstance}`;

        const response = await axios.post(url, {

        });

        const {idMessage} = response.data;

        res.status(200).json({idMessage});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Ошибка при отправке сообщения'});
    }
};

export default sendNotification;
