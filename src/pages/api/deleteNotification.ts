import {NextApiRequest, NextApiResponse} from 'next';
import axios from 'axios';

const DeleteNotification = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const {idInstance, apiTokenInstance, receiptId} = req.body;

        const url = `https://api.green-api.com/waInstance${idInstance}/DeleteNotification/${apiTokenInstance}/${receiptId}`;

        const response = await axios.delete(url);

        res.status(200).json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Ошибка при удалении сообщения'});
    }
};

export default DeleteNotification;