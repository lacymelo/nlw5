import { getCustomRepository, Repository } from "typeorm"
import { Connection } from "../entities/Connection"
import { ConnectionsRepositories } from "../repositories/ConnectionsRepositories"

interface IConnections {
    socket_id: string
    user_id: string
    admin_id?: string
    id?: string
}

class ConnectionsService {
    private connectionRepository: Repository<Connection>
    
    constructor (){
        this.connectionRepository = getCustomRepository(ConnectionsRepositories)
    }

    async create({ socket_id, user_id, admin_id, id }: IConnections){

        const connection = this.connectionRepository.create({
            socket_id,
            user_id,
            admin_id,
            id
        })

        await this.connectionRepository.save(connection)

        return connection
    }
 
    async index(user_id: string){
        const connect = await this.connectionRepository.findOne({user_id})

        return connect;
    }

    async findAllWithoutAdmin(){
        const connect = await this.connectionRepository.find({
            where: {
                admin_id: null
            },
            relations: ["user"]
        })

        return connect;
    }
}

export { ConnectionsService }