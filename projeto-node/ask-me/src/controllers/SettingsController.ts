import { Request, response, Response } from "express"
import { SettingsService } from "../service/SettingsService"

class SettingsController{
    async create(request: Request, response: Response){
        const { username, chat } = request.body

        const settingsService = new SettingsService()

        const setting = await settingsService.create({username, chat})

        return response.status(201).json(setting)
    }

    async findByUsername(request: Request, response: Response){
        const { username } = request.params
        const settingsService = new SettingsService()

        const setting = await settingsService.findByUsername(username)

        return response.status(200).json(setting)
    }

    async update(request: Request, response: Response){
        const { username } = request.params
        const { chat } = request.body
        const settingsService = new SettingsService()

        const setting = await settingsService.update(username, chat)

        return response.status(200).json(setting)
    }
}

export { SettingsController }