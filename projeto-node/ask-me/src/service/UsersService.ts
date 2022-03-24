import { getCustomRepository, Repository } from "typeorm"
import { User } from "../entities/User"
import { UsersRepositories } from "../repositories/UsersRepositories"

interface ICreateUsers{
    email: string
}

class UsersService {
    private userRepository: Repository<User>

    constructor(){
        this.userRepository = getCustomRepository(UsersRepositories)
    }

    async show({email}: ICreateUsers){
        const userAlreadyExists = await this.userRepository.findOne({email})

        return userAlreadyExists
    }

    async create({email}: ICreateUsers){

        const userAlreadyExists = this.show({email})

        //verifica se este email já existe na base de dados
        if(userAlreadyExists){
            throw new Error("Email already exists")
        }     
        
        const user = this.userRepository.create({
            email
        })

        await this.userRepository.save(user)

        return user
    }
}

export { UsersService }