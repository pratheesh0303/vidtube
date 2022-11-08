import { createError } from "../error.js";
import User from "../models/User.js";
import Video from "../models/Video.js";

//create video
export const addVideo = async(req, res, next)=>{
    
    try {
        const video = new Video({userId: req.user.id, ...req.body});
        const savedVideo = await video.save();
        res.status(200).json(savedVideo);
    } catch (error) {
        next(error);
    }
        
}
//update video
export const updateVideo = async(req, res, next)=>{
    
    try {
        const video = await Video.findById(req.params.id);
        if(!video)return next(createError(404, "video not found"));
        if(req.user.id !== video.userId) return next(createError(403, 'You can edit only your video'));
        const updatedVideo = await Video.findByIdAndUpdate(req.params.id,{
            $set: req.body,
        }, {new: true})
        res.status(200).json(updatedVideo);
    } catch (error) {
        next(error);
    }
        
}
//delete video
export const deleteVideo = async(req, res, next)=>{
    
    try {
        const video = await Video.findById(req.params.id);
        if(!video)return next(createError(404, "video not found"));
        if(req.user.id !== video.userId) return next(createError(403, 'You can delete only your video'));
        await Video.findByIdAndDelete(req.params.id)
        res.status(200).json("video deleted successfully");
    } catch (error) {
        next(error);
    }
        
}

//get video

export const getVideo = async(req, res, next)=>{
    
    try {
        const video = await Video.findById(req.params.id);
        if(!video)return next(createError(404, "video not found"));
        res.status(200).json(video);
    } catch (error) {
        next(error);
    }
        
}

//trending video

export const getTrendingVideos = async(req, res, next)=>{
    
    try {
        const video = await Video.aggregate([
            { "$addFields": { "viewCount": { "$size": "$views" }}},
            { "$sort": { "viewCount": -1 }}
          ]);
        if(!video)return next(createError(404, "video not found"));
        res.status(200).json(video);
    } catch (error) {
        next(error);
    }
        
}

//random video

export const getRandomVideos = async(req, res, next)=>{
    
    try {
        //getting 50 random videos
        const videos = await Video.aggregate([{$sample: { size: 50}}]);
        res.status(200).json(videos);
    } catch (error) {
        next(error);
    }
        
}

//subscribed channel video

export const getSubscribedVideos = async(req, res, next)=>{
    
    try {
        const user = await User.findById(req.user.id);
        const subscribedChannels = user.subscribed;
        
        const allVideos = await Promise.all(
            subscribedChannels.map((channelId)=>{
                return Video.find({userId: channelId});
            })
        )
        res.status(200).json(allVideos.flat().sort((a,b)=> b.createdAt-a.createdAt));

    } catch (error) {
        next(error);
    }
        
}

//increase video view
export const updateVideoViews = async(req, res, next)=>{
    try {
        const video = await Video.findById(req.params.id);
        if(!video)return next(createError(404, "video not found"));
        const updatedVideo = await Video.findByIdAndUpdate(req.params.id,{
            $push: {views: {id:req.user.id, ...req.body}},
        })
        res.status(200).json("The view has been updated");
    } catch (error) {
        next(error);
    }
        
}

//search video by tag

export const getVideosByTags = async(req, res, next)=>{
    
    try {
        const tags = req.query.tags;
        const splitTags = tags.split(",");
        const video = await Video.find({tags: {$in:splitTags}}).limit(20);
        res.status(200).json(video);
    } catch (error) {
        next(error);
    }
        
}

//search
export const search = async(req, res, next)=>{
    
    try {
        const query = req.query.q;
        const video = await Video.find({title: {$regex: query, $options: "i"}}).limit(40);
        if(!video)return next(createError(404, "video not found"));
        res.status(200).json(video);
    } catch (error) {
        next(error);
    }
        
}

export const getVideosByUser = async (req, res, next)=>{
    try {
        const videos = await Video.find({userId: req.user.id});
        res.status(200).json(videos);
    } catch (error) {
        next(error);
    }
}

