import { Router } from "express";
import checkAuth from "../middleware/checkAuth";

 const router = Router()

 router.route('/fetch').get(checkAuth, ()=>{})
 export default router