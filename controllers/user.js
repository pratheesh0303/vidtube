import { createError } from "../error.js"
import User from "../models/User.js"
import Video from "../models/Video.js";

export const updateUser = async (req, res, next)=>{
    try {
        if(req.params.id !== req.user.id) return next(createError(403, "You can't update other's account"));
        const updatedUser = await User.findByIdAndUpdate(req.params.id,
            {
                $set: req.body,
            },
            {new: true}
        )
        const {password, ...others} = updatedUser._doc;
        res.status(200).json(others)
        
    } catch (error) {
        next(error);
    }
}

export const deleteUser = async (req, res, next) =>{
    if(req.params.id !== req.user.id) return next(createError(401, "You can't delete other's account"))
    
    const deletedUser = await User.findByIdAndDelete(req.params.id)
    res.status(200).json("user deleted successfully");
}

export const getUser = async (req, res, next)=>{
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}

export const subscribeAChannel = async (req, res, next)=>{
    try {  
        const updatedUser = await User.findOneAndUpdate({_id:req.user.id},
            {
                $push: {subscribed: req.params.channelId},
            }
        )
        const updatedSubscribedUser = await User.findOneAndUpdate({_id:req.params.channelId},
            {
                $inc: {subscribers: 1},
            }
        )
        res.status(200).json("Subscription Successfull");
           

    } catch (error) {
        next(error)
    }

}

export const unSubscribeAChannel = async (req, res, next)=>{
    try {  
        const updatedUser = await User.findOneAndUpdate({_id:req.user.id},
            {
                $pull: {subscribed: req.params.channelId},
            }
        )
        const updatedSubscribedUser = await User.findOneAndUpdate({_id:req.params.channelId},
            {
                $inc: {subscribers: -1},
            }
        )
        res.status(200).json("Unsubscribed Successfully");
           

    } catch (error) {
        next(error)
    }

}

//like


export const likeVideo = async (req, res, next) =>{

    try {
        const video = await Video.findByIdAndUpdate({_id:req.params.videoId},{
            $addToSet: {likes: req.user.id},
            $pull: {dislikes: req.user.id}
        }, {new: true})
        res.status(200).json("The video has been liked");
    } catch (error) {
        next(error);
    }
}

//unlike video
export const unLikeVideo = async (req, res, next) =>{

    try {
        const video = await Video.findByIdAndUpdate({_id:req.params.videoId},{
            $addToSet: {dislikes: req.user.id},
            $pull: {likes: req.user.id}
           }, {new: true})
           res.status(200).json("The video has been disliked");
    } catch (error) {
        next(error);
    }
}


