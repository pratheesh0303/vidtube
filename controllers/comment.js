import { createError } from "../error.js";
import Comment from "../models/Comment.js";
import Video from "../models/Video.js";

export const addComment = async (req, res, next)=>{
    try {
        const newComment = new Comment({
            ...req.body,
            userId: req.user.id,
        })
        const savedComment = await newComment.save();
        res.status(200).json(newComment);
    } catch (error) {
        next(error)
    }
}
export const deleteComment = async (req, res, next)=>{
    try {
        const comment= await Comment.findById(req.params.id);
        const video = await Video.findById(comment.videoId);
        if(req.user.id === comment.userId || req.user.id === video.userId ){
            await Comment.findByIdAndDelete(req.params.id);
            res.status(200).json("Comment has been deleted");
        } {
            next(createError(403, "you can't modify/delete other's comments untill you are the owner of the video"))
        }
    } catch (error) {
        next(error)
    }
}
export const getcomments = async (req, res, next)=>{
    try {
        const comments = await Comment.find({videoId: req.params.videoId}).sort({createdAt: -1});
        res.status(200).json(comments);
    } catch (error) {
        next(error)
    }
}