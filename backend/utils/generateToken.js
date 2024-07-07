import Jwt  from "jsonwebtoken";



 export const generateToken=(res,userId)=>{

   
    //creating token using jst

const token=Jwt.sign(
        {
            userId
        },
        process.env.JWT_SECRET,
        {
            expiresIn:'20D'
        }
    )

    // setting the token in a cookie

    const cookieParams={

        httpOnly:true,
        secure:process.env.NODE_ENV!=='development',
        sameSite:'strict',
        maxAge:30*24*60*60*1000
    }


     res.cookie('jwt',token,cookieParams)


}



