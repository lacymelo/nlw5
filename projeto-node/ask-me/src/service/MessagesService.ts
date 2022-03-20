import { getCustomRepository, Repository } from "typeorm"
import { Message } from "../entities/Message"
import { MessagesRepositories } from "../repositories/MessagesRepositories"

interface IMessages{
    admin_id?: string
    user_id: string
    text: string
}

class MessagesService{
    private  messageRepository: Repository<Message>

    constructor () {
        this.messageRepository = getCustomRepository(MessagesRepositories)
    }

    async create({admin_id, user_id, text}: IMessages){
        const message = this.messageRepository.create({
            admin_id,
            user_id,
            text
        })

        await this.messageRepository.save(message)

        return message
    }

    async index(user_id: string){
        const messages = await  this.messageRepository.find({
            where: {
                user_id: user_id
            },

            relations: ["user"]
        })

        return messages
    }
}

export { MessagesService }