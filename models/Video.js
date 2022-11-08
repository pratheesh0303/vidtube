import mongoose from "mongoose";

const videoSchema = mongoose.Schema({
    userId:{
        type: String,
        required: true,
    },
    title:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    imageUrl:{
        type: String,
        required: true,
    },
    videoUrl:{
        type: String,
        required: true,
    },
    views: {
        type: [Object],
        default: [],
    },
    tags: {
        type: [String],
        default: [],
    },
    likes: {
        type: [String],
        default: [],
    },
    dislikes: {
        type: [String],
        default: [],
    },
}, {timestamps: true})

export default mongoose.model("Video", videoSchema);