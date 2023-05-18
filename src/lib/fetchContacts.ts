import axios from "axios";
import {IContactData} from "@/pages/api/getContacts";

interface IFetchContacts {
    idInstance: string,
    apiTokenInstance: string,
    setContacts: (data: IContactData[]) => void,
}

const fetchContacts = async ({idInstance, apiTokenInstance, setContacts}: IFetchContacts) => {
    const response = await axios.post('/api/getContacts', {
        idInstance: idInstance,
        apiTokenInstance: apiTokenInstance,
    });
    setContacts(response.data)
    console.log(response)

}
export default fetchContacts