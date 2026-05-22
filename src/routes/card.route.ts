import { Router } from "express";
import { defineRequest } from "../utils";
import { CardService } from "../services/card.service";

export const CardRoute = Router()

CardRoute.get('/:id', async (req, res) => {
    await defineRequest(res, async () => {
        const id = Number(req.params.id)
        res.json(await CardService.getCardDetails(id))   
    })
})