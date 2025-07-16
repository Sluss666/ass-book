import { 
    newMessage,
    getMessages,
    emptyChat,
    deleteMessage,
    editMessage 
} from "../controllers/messageController"
import {Router} from 'express'
import checkAuth from "../middleware/checkAuth"

const router = Router()

router.route('/message')
    .get(checkAuth, getMessages)
    .post(checkAuth, newMessage)
    .delete(checkAuth, deleteMessage)
    .put(checkAuth, editMessage)

router.route('/empty').delete(checkAuth, emptyChat)

export default router