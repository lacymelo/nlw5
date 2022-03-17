import { request, Router } from 'express'
import { SettingsController } from './controllers/SettingsController'

const routes = Router()

//instancia de controllers
const settingsController = new SettingsController()

routes.post('/settings', settingsController.create)

export { routes }