const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = "fdnbgkd656d5g6dfgmnbdfjfg";
const user = require("../models/usermodels");
var userAuthentication = async (req,res,next)=>{
    console.log("it is coming in jwt")
        const {authorization} = req.headers;
        
        if(!authorization){
            console.log("Sorry You are not logged in")
            return res.json({
                status:"authorization failed",
                message:"Looks like you are not logged in, Kindly register or signup first"
            })
        }
        
      
            if (authorization){
                const token = authorization

                 await jwt.verify(token,JWT_SECRET_KEY, async(err,decoded) => {
                    
                    if (err){
                         res.status(403).json("token is not valid")
                        return
                        }

                    // req.user = user;
                    // console.log("decoded",decoded)
                    req.user = await user.findById(decoded.id);
                    // console.log(req.user)
                    next();
                })
                // console.log(userId);
            }else{
                return res.status(401).json("You are not authenticated")
            }
        // }
        // else{
        //     res.status(401).json({
        //         status:"Failed",
        //         message:"Kindly login"
        //     })
        // }

}
module.exports = userAuthentication;