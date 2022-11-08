import express from "express";
import { googleSignin, signin, signup } from "../controllers/authentication.js";

const router = express.Router();

//create a user 
router.post("/signup", signup)


//Sign in

router.post("/signin", signin )

//Google authentication

router.post("/google", googleSignin)



export default router;