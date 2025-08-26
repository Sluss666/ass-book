import { startChat, existsChat, deleteChat } from '../controllers/chatController'
import { Router } from 'express'
import checkAuth from '../middleware/checkAuth'

const router = Router()
router.route('/chat').post(checkAuth, startChat).delete(checkAuth, deleteChat)
router.route('/chat/:chatId')
    .get(checkAuth, existsChat)
export default router