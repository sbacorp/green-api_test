import {NextApiRequest, NextApiResponse} from 'next';
import axios from 'axios';

export interface IContactData {
    id: string,
    name?: string,
    type: string
}

const getContacts = async (req: NextApiRequest, res: NextApiResponse<IContactData | { message: string }>) => {
    try {
        const {idInstance, apiTokenInstance} = req.body;

        const url = `https://api.green-api.com/waInstance${idInstance}/GetContacts/${apiTokenInstance}`;

        const response = await axios.get(url);
        res.status(200).json(response.data);
    } catch (error) {
        console.error(error);
        //todo uncomment
        // res.status(500).json({message: 'Ошибка при получении списка контактов'});
    }
};

export default getContacts;
