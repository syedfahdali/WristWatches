import User from "../models/userModel.js";
import asyncHandler from "../middleware/asyncHandler.js";
import Jwt from "jsonwebtoken";
import { generateToken } from "../utils/generateToken.js";

// @desc    Auth User & get Token
// @route   POST /api/users/login
// @access  Public

const authUser = asyncHandler(async (req, res) => {
  
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if(!user){

  res.status(404)
    
    throw new Error('user not found')
  }

  generateToken(res, user._id);

  if (user && (await user.matchPassword(password))) {
   
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("invalid email and password");
  }
});

// @desc    Register User
// @route   POST /api/users
// @access  Public

const registerUser = asyncHandler(async (req, res) => {

  const { name, email, password } = req.body;



  const userExist = await User.findOne({ email });

  if (userExist) {
    
    res.status(404);

    throw new Error("user already Exist");
  } else {

   

    const newUser = await User.create({
      name,
      email,
      password,
    });

    

    generateToken(res,newUser._id);

    
    res.status(200).send({ message: "user created successfully", newUser });
  }

 
});

// @desc    Logout User
// @route   POST /api/users/logout
// @access  private

const logoutUser = asyncHandler(async (req, res) => {
  const cookieParams = {
    httpOnly: true,
    expiresIn: new Date(0),
  };

  res.cookie("jwt", "", cookieParams);

  res.status(200).json({ message: "logout successfully" });
});

// @desc    GET User Profile
// @route   GET /api/users/profile
// @access  private

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("unAuthorized");
  }
});

// @desc     update User Profile
// @route   PUT /api/users/profile
// @access  private

const updateUserProfile = asyncHandler(async (req, res) => {
  
 
  
  const user = await User.findById(req.user._id);



  if (user) {

 
     user.name=req.body.name || user.name
     user.email=req.body.email || user.email

     if(req.body.password){

        user.password=req.body.password
     }

     const updatedUser=await user.save()

     const name=updatedUser.name
      const email=updatedUser.email


    res.status(200).json({
     "message":'user updated successfully',
     name,email
    });
  } else {
    res.status(401);
    throw new Error("unAuthorized");
  }
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
};
