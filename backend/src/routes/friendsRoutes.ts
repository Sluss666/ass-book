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
 router.route('/fetch/_id:string').get(checkAuth, fetchFriends)
 router.route('/response-request').post(checkAuth, requestResponse)
 router.route('/fetch-requests/_id:string').get(checkAuth, fetchRequests)
 router.route('/unlist/userEndsId:string/userTwo:string').get(checkAuth, endFriendShip)
 router.route('/send-request/id_from:string/to_user:string').get(checkAuth, friendRequest)
 export default router