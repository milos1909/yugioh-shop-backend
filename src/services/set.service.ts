import { Like } from "typeorm"
import { AppDataSource } from "../db"
import { Set } from "../entities/Set"
import { CardService } from "./card.service"

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

        if(data == null){
            throw new Error('NOT_FOUND')
        }

        const rsp = await CardService.getCardsBySet(String(data?.set_name))
        
        return {
            set_details: data,
            cards: rsp.data
        }
    }
}