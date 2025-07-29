import { 
    signUpUser, 
    loginUser, 
    forgotPassword, 
    changeUser, 
    changePassword, 
    changePicture,
    changeDescription,
    deleteUser,
    allowChangePass,
    restorePass,
    logoutSession,
    blockUser,
    getUsers
} from "../controllers/userController"
import { Router, Request, Response } from 'express'
import checkAuth from "../middleware/checkAuth"
import { UserITFace } from "../models/User"

interface AuthRequest extends Request {
    user?: UserITFace | null
}

const router = Router()

router.route('/verify').get(checkAuth, 
    (req: AuthRequest, res: Response)=>{
    const user = req.user
    res.json({user})
    }
)

router.route('/').get(checkAuth, getUsers)

router.route('/start')
    .put(signUpUser)
    .post(loginUser)

router.route('/forgot-password')
    .post(forgotPassword)
    .patch(allowChangePass)
    .put(checkAuth, restorePass)

router.route('/user')
    .put(checkAuth, changeUser)
    .post(checkAuth, changePassword)
    .delete(checkAuth, deleteUser)

router.route('/user/block/:id').patch(checkAuth, blockUser)

router.route('/change-description').put(checkAuth, changeDescription)
router.route('/change-picture').put(checkAuth, changePicture)

router.route('/exit/:_id').get(checkAuth, logoutSession)

export default router