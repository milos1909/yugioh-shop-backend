import { Like } from "typeorm"
import { AppDataSource } from "../db"
import { Set } from "../entities/Set"

export class SetService {
    static async getSets(name: string, offset: number){
      
        const repo = AppDataSource.getRepository(Set)
        
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
}