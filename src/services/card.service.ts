import axios from "axios";

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

}