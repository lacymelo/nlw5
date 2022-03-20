import { Request, Response } from "express"
import { UsersService } from "../service/UsersService";

class UsersController{
    async create(req: Request, res: Response){
        const { email } = req.body;

        const usersService = new UsersService()

        const user = await usersService.create({email})

        return res.status(201).json(user)
    }
}

export { UsersController }