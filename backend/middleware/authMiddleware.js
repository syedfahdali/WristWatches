import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncHandler from "./asyncHandler.js";

const protect = asyncHandler(async (req, res, next) => {

  let token;

  

   // Read JWT from the 'jwt' cookie
   token = req.cookies.jwt;



  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.userId).select("-password");

      next();
    } catch (err) {
      console.log(err);
    }
  } else {
    res.status(401);
    throw new Error("unAuthorized Token");
  }
});

const admin = asyncHandler((req, res, next) => {

    if(req.user && req.user.isAdmin){
 
      
        next()
    }

    else{

        res.status(401);
    throw new Error("unAuthorized as admin");

    }
});

export { protect, admin };
