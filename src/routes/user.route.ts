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