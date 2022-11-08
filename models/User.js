import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
    },
    image:{
        type: String,
    },
    subscribers: {
        type: Number,
        default: 0,
    },
    subscribed: {
        type: [String]
    },
    googleUser : {
        type: Boolean,
        default: false,
    },
}, {timestamps: true})

export default mongoose.model("User", userSchema);