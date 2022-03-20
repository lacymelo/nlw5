import { getCustomRepository, Repository } from "typeorm"
import { Setting } from "../entities/Setting"
import { SettingsRepositories } from "../repositories/SettingsRepositories"

interface ICreateSettings {
    username: string
    chat: boolean
}

class SettingsService{
    private settingRepository: Repository<Setting>

    constructor(){
        this.settingRepository = getCustomRepository(SettingsRepositories)
    }


    async create(settings: ICreateSettings){
        const { username, chat } = settings

        const settingAlreadyExists = await this.settingRepository.findOne({
            where: {
                username: username
            }
        })

        if(settingAlreadyExists){
            throw new Error('Setting already exists.')
        }

        const setting = this.settingRepository.create({
            username,
            chat
        })

        await this.settingRepository.save(setting)

        return setting
    }
}

export { SettingsService }