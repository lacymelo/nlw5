import { getCustomRepository, Repository } from "typeorm"
import { Setting } from "../entities/Setting"
import { SettingsRepositories } from "../repositories/SettingsRepositories"

interface ICreateSettings {
    username: string
    chat: boolean
}

class SettingsService {
    private settingRepository: Repository<Setting>

    constructor() {
        this.settingRepository = getCustomRepository(SettingsRepositories)
    }


    async create(settings: ICreateSettings) {
        const { username, chat } = settings

        const settingAlreadyExists = await this.settingRepository.findOne({
            where: {
                username: username
            }
        })

        if (settingAlreadyExists) {
            throw new Error('Setting already exists.')
        }

        const setting = this.settingRepository.create({
            username,
            chat
        })

        await this.settingRepository.save(setting)

        return setting
    }

    async findByUsername(username: string) {
        const settings = await this.settingRepository.findOne({
            username
        })

        return settings
    }

    async update(username: string, chat: boolean) {
        const settings = await this.settingRepository
            .createQueryBuilder()
            .update(Setting)
            .set({ chat })
            .where("username = :username", {
                username
            })
            .execute()

        return settings
    }
}

export { SettingsService }