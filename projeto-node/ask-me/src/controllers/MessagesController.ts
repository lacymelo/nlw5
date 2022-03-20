import { json, Request, Response } from "express"
import { MessagesService } from "../service/MessagesService"

class MessagesController {
    async create(req: Request, res: Response){
        const { admin_id, user_id, text } = req.body

        const messagesService = new MessagesService()

        const message = await messagesService.create({admin_id, user_id, text})

        return res.status(201).json(message)
    }

    async index(req: Request, res: Response){
        const { id } = req.params

        const messagesService = new MessagesService()

        const messages = await messagesService.index(id)

        return res.status(200).json(messages)
    }
}

export { MessagesController }