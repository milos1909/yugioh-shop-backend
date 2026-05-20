import { Like } from "typeorm"
import { AppDataSource } from "../db"
import { Set } from "../entities/Set"
import axios from "axios"

const repo = AppDataSource.getRepository(Set)

export class SetService {
    static async getSets(name: string, offset: number){
        const [sets, total] = await repo.findAndCount({
            where: name ? {
                set_name: Like(`%${name}%`)
            } : {},
            order: {
                tcg_date: 'DESC'
            },
            take: 18,
            skip: offset
        })

        return {sets, total}
    }

    static async getSetDetails(set_code: string){
        const data = await repo.findOne({
            where: {
                set_code: set_code
            }
        })

        const rsp = await axios.get(`https://db.ygoprodeck.com/api/v7/cardinfo.php`, {
            params: {
                cardset: data?.set_name
            }
        })
        
        return {
            set_details: data,
            cards: rsp.data.data
        }
    }
}