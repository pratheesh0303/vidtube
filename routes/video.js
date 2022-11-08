import express from "express";
import { addVideo, updateVideo, deleteVideo, getVideo, getTrendingVideos, getRandomVideos, getSubscribedVideos, getVideosByTags, search, getVideosByUser, updateVideoViews} from "../controllers/video.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

router.post("/", verifyToken, addVideo)
router.put("/", verifyToken, updateVideo)
router.delete("/", verifyToken, deleteVideo)
router.get("/video/:id", getVideo)
router.get("/trending", getTrendingVideos)
router.get("/random", getRandomVideos)
router.get("/subscribed",verifyToken, getSubscribedVideos)
router.get("/search_tag",getVideosByTags)
router.get("/search", search)
router.get("/own", verifyToken, getVideosByUser)
router.put("/video/views/:id",verifyToken, updateVideoViews)

export default router;