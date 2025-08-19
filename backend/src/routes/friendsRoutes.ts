import { Router } from "express";
import checkAuth from "../middleware/checkAuth";
import {
    fetchFriends,
    fetchRequests,
    friendRequest,
    requestResponse,
    endFriendShip
} from '../controllers/friendController'

 const router = Router()
 router.route('/fetch/:_id').get(checkAuth, fetchFriends)
 router.route('/response-request').post(checkAuth, requestResponse)
 router.route('/fetch-requests/:_id').get(checkAuth, fetchRequests)
 router.route('/unlist/:user_ends/:user_two').get(checkAuth, endFriendShip)
 router.route('/send-request/:id_from/:to_user').get(checkAuth, friendRequest)
 export default router