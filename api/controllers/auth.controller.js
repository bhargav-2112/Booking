import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const register = async(req, res, next) => {
    try {
        const newUser = new User({
            ...req.body,
            password: bcrypt.hashSync(req.body.password, 10),
        });
        await newUser.save();
        res.status(200).send("User created");
    } catch (error) {
        next(error);
    }
}

export const login = async(req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) return next(createError("User not found", 404));

        const passwordCorrect = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if (!passwordCorrect) return next(createError("Invalid password", 400));

        const token = jwt.sign({id: user.id, isAdmin:user.isAdmin}, process.env.JWT);

        const{password, isAdmin, ...otherDetails} = user._doc;

        // setting cookie
        res.cookie("access_token", token, {
            httpOnly: true, //by enabling this option(i.e. httpOnly:true), the cookie cannot be cleared by the user
        }).status(200).json({
            details: {...otherDetails},
            isAdmin
        });
    } catch (error) {
        next(error);
    }
}