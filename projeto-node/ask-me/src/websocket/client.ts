import { io } from "../http"
import { ConnectionsService } from "../service/ConnectionsService"
import { MessagesService } from "../service/MessagesService"
import { UsersService } from "../service/UsersService"

io.on("connect", (socket) => {
    const connectionService = new ConnectionsService()
    const userService = new UsersService()
    const messageService = new MessagesService()

    socket.on("client_first_access", async params => {
        const socket_id = socket.id
        const { email, text } = params
        let user_id = null

        const userExists = await userService.show({ email })

        if (!userExists) {
            const user = await userService.create({ email })

            //salvar conexão com socket_id, user_id
            await connectionService.create({
                socket_id,
                user_id: user.id,
            })

            user_id = user.id
        } else {
            const connection = await connectionService.index(userExists.id)
            if (!connection) {
                //salvar conexão com socket_id, user_id
                await connectionService.create({
                    socket_id,
                    user_id: userExists.id,
                })
            } else {
                connection.socket_id = socket_id

                await connectionService.create(connection)
            }

            user_id = userExists.id
        }

        await messageService.create({user_id, text})

        const allMessages = await messageService.listByUser(user_id)

        socket.emit("client_list_all_messages", allMessages)
    })
})