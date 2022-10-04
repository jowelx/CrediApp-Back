import {Router} from 'express'
import { addUser,
         addUserFaceBook,
         addUserGoogle,
         loginUser,
         loginUserGoogle,
         loginUserFacebook,
         addUserBussines,
         addBountyData
        } from '../db/controllers/User.js';
const router = Router()
router.post("/addUserBussines",addUserBussines)
router.post("/loginUser",loginUser)
router.post("/loginUserGoogle",loginUserGoogle)
router.post("/loginUserFacebook",loginUserFacebook)
router.post("/addUser",addUser);
router.post("/addUserFaceBook",addUserFaceBook);
router.post("/addUserGoogle",addUserGoogle);
router.post('/addBountyData',addBountyData)
router.post("/loginUser", async (req,res)=>{
  loginUser(req,res)
})



export default router;
