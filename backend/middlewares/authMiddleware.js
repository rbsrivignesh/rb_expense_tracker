const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.protect = async(req,res, next)=>{
    try {
        
        let token = req.headers.authorization?.split(" ")[1];
        if(!token){
            return res.status(400).json({message : "Not Authorized, No Token"});

        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select("-password");
        next();
    } catch (error) {
        res.status(500).json({message : "Not Authorized, token failed"});
        console.log(error)
    }
}