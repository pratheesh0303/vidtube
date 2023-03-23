import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js"
import { createError } from "../error.js";

export const signup = async (req, res, next) =>{
    try {
        const saltRounds = 10;
        const myPlaintextPassword = req.body.password;
        const someOtherPlaintextPassword = 'not_bacon';

        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(myPlaintextPassword, salt);
        const newUser = new User({...req.body, password: hash});
        
        await newUser.save();
        res.status(200).json("user has been created");
    } catch (error) {
        next(createError(409, `This user is already registered with us`));
    }
}

export const signin = async (req, res, next) =>{
    try {
        const user = await User.findOne({email: req.body.email});
        if(!user) return next(createError(404, "User Not Found"));
        const {password, ...others} = user._doc;
        const match = await bcrypt.compare(req.body.password, user.password);
        if(!match) return next(createError(401, "Wrong Credentials"));
        const token = jwt.sign({id: user._id}, process.env.JWT);
        res.cookie("access_token", token, {
            httpOnly: true
        }).status(200).json(others);
    } catch (error) {
        next(error)
    }
}

export const googleSignin = async (req, res, next) =>{
    try {
        const user = await User.findOne({name: req.body.name});
        if(user){
            const token = jwt.sign({id: user._doc._id}, process.env.JWT);
            res.cookie("access_token", token, {
                httpOnly: true
            }).status(200).json(user._doc);
        } else {
            const newUser = new User({
                ...req.body,
                googleUser: true,
            })
            const savedUser = await newUser.save();
            const token = jwt.sign({id: savedUser._id}, process.env.JWT);
            res.cookie("access_token", token, {
                httpOnly: true
            }).status(200).json(savedUser._doc);
        }
       
    } catch (error) {
        next(error)
    }
}