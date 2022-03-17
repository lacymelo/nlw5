import { getCustomRepository } from "typeorm"
import { SettingsRepositories } from "../repositories/SettingsRepositories"

interface ICreateSettings {
    username: string
    chat: boolean
}

class SettingsService{
    async create(settings: ICreateSettings){
        const { username, chat } = settings

        const settingRepository = getCustomRepository(SettingsRepositories)

        const settingAlreadyExists = await settingRepository.findOne({
            where: {
                username: username
            }
        })

        if(settingAlreadyExists){
            throw new Error('Setting already exists.')
        }

        const setting = settingRepository.create({
            username,
            chat
        })

        await settingRepository.save(setting)

        return setting
    }
}

export { SettingsService }