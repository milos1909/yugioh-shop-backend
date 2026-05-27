import { Router } from "express";
import { defineRequest } from "../utils";
import { UserService } from "../services/user.service";

export const UserRouter = Router()

UserRouter.post('/signup', async (req, res) => {
    await defineRequest(res, async () => {
        return await UserService.createAccount(req.body)
    })
})

UserRouter.put('/verify/:code', async (req, res) => {
    await defineRequest(res, async () => {
        const code = Number(req.params.code)
        return await UserService.verifyAccount(code)
    })
})

UserRouter.post('/login', async (req, res) => {
    await defineRequest(res, async () => {
        return await UserService.login(req.body)
    })  
})

UserRouter.post('/refresh', async (req, res) => {
    await defineRequest(res, async () => {
        const auth = req.headers['authorization']
        const token = auth && auth.split(' ')[1]

        if(token == undefined) throw new Error("REFRESH_TOKEN_MISSING")

        return await UserService.refreshToken(token)
    })  
})