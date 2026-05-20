import axios from "axios";
import { AppDataSource } from "../db";

const client = axios.create({
    baseURL: 'https://db.ygoprodeck.com/api/v7/cardinfo.php',
    headers: {
        'Accept': 'application/json',
        'X-Name': 'YUGIOH_SHOP'
    },
    validateStatus: (status) => {
        return status === 200
    }
})

export class CardService {
    static async getCardDetails(id: number){
        const rsp = await axios.get(`https://db.ygoprodeck.com/api/v7/cardinfo.php`, {
            params: {
                id: id
            }
        })
        
        return rsp.data
        
    }
}