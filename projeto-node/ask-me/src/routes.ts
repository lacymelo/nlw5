import { Router } from 'express'
import { MessagesController } from './controllers/MessagesController'
import { SettingsController } from './controllers/SettingsController'
import { UsersController } from './controllers/UsersController'

const routes = Router()

//instancia de controllers
const settingsController = new SettingsController()
const usersController = new UsersController()
const messagesController = new MessagesController()

//cria configuração
routes.post('/settings', settingsController.create)

//busca configuração
routes.post('/settings/:username', settingsController.findByUsername)

//atualiza configuração
routes.put('/settings/:username', settingsController.update)

//cria um novo usuário
routes.post('/users', usersController.create)

//cria uma nova mensagem
routes.post('/messages', messagesController.create)

// lista todas as mensagens do usuário
routes.get('/messages/:id', messagesController.index)

export { routes }