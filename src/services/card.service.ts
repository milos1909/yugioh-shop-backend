import axios from "axios";

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
        const rsp = await client.get(`/cardinfo.php`, {
            params: {
                cardset: set_name
            }
        })
        
        return rsp.data
    }

    static async getCardDetails(id: number){
        const rsp = await client.get(`/cardinfo.php`, {
            params: {
                id: id
            }
        })

        return rsp.data.data[0]
    }
}