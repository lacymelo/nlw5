import { Request, Response } from "express"
import { SettingsService } from "../service/SettingsService"

class SettingsController{
    async create(request: Request, response: Response){
        const { username, chat } = request.body

        const settingsService = new SettingsService()

        const setting = await settingsService.create({username, chat})

        return response.status(201).json(setting)
    }
}

export { SettingsController }