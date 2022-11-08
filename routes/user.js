import express from "express";
import { deleteUser, getUser, likeVideo, unLikeVideo, subscribeAChannel, unSubscribeAChannel, updateUser } from "../controllers/user.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

//update user
router.put("/:id", verifyToken, updateUser)

//delete a user
router.delete("/:id", verifyToken, deleteUser)

//get a user
router.get("/:id", getUser)

//subscribe a channel
router.put("/subscribe/:channelId", verifyToken,  subscribeAChannel)

//un subscribe a channel
router.put("/unsubscribe/:channelId", verifyToken,  unSubscribeAChannel)

//like a video
router.put("/like/:videoId", verifyToken, likeVideo)

router.put("/unlike/:videoId", verifyToken, unLikeVideo)





export default router;

