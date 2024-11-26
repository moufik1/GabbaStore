import asyncHandler from '../middlewares/asyncHandler.js';
import User from '../models/userModels.js';
import bcrypt from "bcryptjs";
import createToken from "../utils/createToken.js";

const createUser = asyncHandler(async (req, res) => {
   const {username, email, password} = 
    req.body;
    if(!username || !email || !password){
        throw new Error('Please fill all the inputs.');    
    }

    const emailExists = await User.findOne({email});
    if(emailExists) res.status(400).send("User is already exists !");

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = User({username, email, password: hashedPassword});

    try {
        await newUser.save();
        createToken(res, newUser._id)

        res.status(201).json({_id: newUser._id, 
            username: newUser.username, 
            email: newUser.email, 
            is_Admin: newUser.is_Admin});
    } catch (error) {
        res.status(400);
        throw new Error("Invalid user Data");
        
    }


});


const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body

    const existingUser = await User.findOne({email})
    if(existingUser) {
        const isPasswordvalid = await bcrypt.compare(password, existingUser.password)
        if(isPasswordvalid) {
            createToken(res, existingUser._id)
            
            res.status(201).json({_id: existingUser._id, 
                username: existingUser.username, 
                email: existingUser.email, 
                is_Admin: existingUser.is_Admin
            });

            return // Exit the function after sending the response
        }
    }
});


const logoutCurrentUser = asyncHandler(async(req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    })

    res.status(200).json({message : "Logged Succssfully !! "})
});

const getAllUsers = asyncHandler(async(req, res) => {
    const users = await User.find({});
    res.json(users);
});

const getCurrentUserProfile = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.json({
            _id: user._id,
            username : user.username,
            email : user.email,
        })
    } else {
        res.status(404);
        throw new Error("User Not found.");
        
    }
});

const updateCurrentUserProfile  = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if (user) {
        user.username = req.body.username || user.username
        user.email = req.body.email || user.email

        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
            user.password = hashedPassword;
        }

        const updateduser = await user.save();

        res.json({
            _id: updateduser._id,
            username: updateduser.username,
            email: updateduser.email,
            is_Admin: updateduser.is_Admin,
        })
    } else {
        res.status(404);
        throw new Error("User Not Found");
        
    }
})

const deleteUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        if (user.is_Admin) {
            res.status(400);
            throw new Error("Cannot delete admin User");
        }

        await User.deleteOne({_id: user._id})
        res.json({
            message: "User removed"
        })
    } else {
        res.status(404);
        res.json({message: "User not Found"})
    }
});

const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password');
    if (user) {
        res.json(user);
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});

const updateUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        user.username = req.body.username || user.username
        user.email = req.body.email || user.email
        user.is_Admin = Boolean(req.body.is_Admin)

        const updatedUser = await user.save();
        res.json({
            _id: updatedUser._id,
            username : updatedUser.username,
            email : updatedUser.email,
            is_Admin : updatedUser.is_Admin,
        })
    }else {
        res.status(404);
        throw new Error("User not found");
    }
})

export {createUser, loginUser, 
        logoutCurrentUser, getAllUsers, 
        getCurrentUserProfile, updateCurrentUserProfile,
        deleteUserById, getUserById,
        updateUserById};