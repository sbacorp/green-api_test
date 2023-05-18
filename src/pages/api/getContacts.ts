import {NextApiRequest, NextApiResponse} from 'next';
import axios from 'axios';

interface IContactData {
    id:string,
    name:string,
    

}
const sendNotification = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const {idInstance, apiTokenInstance} = req.body;

        const url = `https://api.green-api.com/waInstance${idInstance}/GetContacts/${apiTokenInstance}`;

        const response = await axios.get(url);


        res.status(200).json({idMessage});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Ошибка при отправке сообщения'});
    }
};

export default sendNotification;
