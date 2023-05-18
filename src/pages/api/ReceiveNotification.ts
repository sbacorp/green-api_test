import {NextApiRequest, NextApiResponse} from 'next';
import axios from 'axios';

export interface IReceiveNotification {
    typeWebhook: string;
    instanceData: {
        idInstance: number;
        wid: string;
        typeInstance: string;
    };
    timestamp: number;
    idMessage: string;
    senderData: {
        chatId: string;
        sender: string;
        senderName: string;
    };
    messageData: {
        typeMessage: string;
        textMessageData: {
            textMessage: string;
        };

    }

}


export default async function receiveNotificationHandler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const idInstance = String(req.query.idInstance);
        const apiTokenInstance = String(req.query.apiTokenInstance);
        const url = `https://api.green-api.com/waInstance${idInstance}/ReceiveNotification/${apiTokenInstance}`;
        const response = await axios.get(url);
        console.log(response.data, 'receive')
        if (response.data) {
            await deleteNotification(response.data.receiptId, idInstance, apiTokenInstance);
        }
        res.status(200).json(response.data);

    } catch (error) {
        console.error('Error receiving notification:', error);
        res.status(500).json({success: false});
    }
}

async function deleteNotification(receiptId: number, idInstance: string, apiTokenInstance: string) {
    try {
        const url = `https://api.green-api.com/waInstance${idInstance}/DeleteNotification/${apiTokenInstance}/${receiptId}`;
        await axios.delete(url);
    } catch (error) {
        console.error('Error deleting notification:', error);
        throw error;
    }
}

