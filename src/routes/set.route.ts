import { Router } from "express";
import { SetService } from "../services/set.service";
import { defineRequest } from "../utils";

export const SetRoute = Router()

SetRoute.get('/', async (req, res) => {
    await defineRequest(res, async () => {
        const name = String(req.query.name)
        const skip = Number(req.query.offset) || 0

        return await SetService.getSets(name, skip)
    })
    
})

SetRoute.get('/:set_code', async (req, res) => {
    await defineRequest(res, async () => {
        const set_code = String(req.params.set_code)
        return await SetService.getSetDetails(set_code)
    })
})