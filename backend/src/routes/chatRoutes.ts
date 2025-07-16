import {
    startChat,
    existsChat,
    deleteChat
} from '../controllers/chatController'
import { Router } from 'express'
import checkAuth from '../middleware/checkAuth'

const router = Router()

router.route('/chat')
    .get(checkAuth, existsChat)
    .post(checkAuth, startChat)
    .delete(checkAuth, deleteChat)

export default router