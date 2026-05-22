import axios from "axios";
import { AppDataSource } from "../db";

const client = axios.create({
    baseURL: 'https://db.ygoprodeck.com/api/v7',
    headers: {
        'Accept': 'application/json',
        'X-Name': 'YUGIOH_SHOP'
    },
    validateStatus: (status) => {
        return status === 200
    }
})

export class CardService {
    static async getCardsBySet(set_name: string) {
        return await client.get(`/cardinfo.php`, {
            params: {
                cardset: set_name
            }
        })
    }

    static async getCardDetails(id: number){
        return await client.get(`/cardinfo.php`, {
            params: {
                id: id
            }
        })
    }
}