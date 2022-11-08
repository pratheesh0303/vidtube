import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
    userId:{
        type: String,
        required: true,
    },
    videoId:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
}, {timestamps: true})

export default mongoose.model("comment", commentSchema);