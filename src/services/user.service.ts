import { AppDataSource } from "../db";
import { User } from "../entities/User";
import bcrypt from "bcrypt"
import { MailService } from "./mail.service";
import { generateVerificationCode } from "../utils";
import { IsNull } from "typeorm";

const repo = AppDataSource.getRepository(User)

export class UserService {
    static async createAccount(obj: any){
        if(await repo.existsBy({email: obj.email}) || await repo.existsBy({username: obj.username})){
            throw Error()
        }

        const hashed = bcrypt.hashSync(obj.password, 12)
        const code = generateVerificationCode(  )

        MailService.send(obj.email, 'Email verification code', `
            <h3>Hi ${obj.username}, welcome to our app</h3>
            <p>Your verification code is: <strong>${code}</strong</p>
        `)

        await repo.save({
            username: obj.username,
            email: obj.email,
            emailCode: code,
            password: hashed,
            createdAt: new Date()
        })
    }

    static async verifyAccount(code: number){
        const acc = await repo.findOneBy({
            emailCode: code,
            verifiedAt: IsNull(),
            deletedAt: IsNull() 
        })

        if (acc == null) throw new Error('NOT_FOUND')

        acc.verifiedAt = new Date()
        await repo.save(acc)
    }
}