const jwt = require("jsonwebtoken");
const User = require("../models/User");


const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
}

exports.registerUser = async (req, res) => {
    try {
        const { fullName, email, password, profileImageUrl } = req.body;
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "All Fields are mandatory" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use" });
        }
        const user = await User.create({
            fullName,
            email,
            password,
            profileImageUrl
        });

        res.status(201).json({
            id: user._id,
            user,
            token: generateToken(user._id)
        });

    } catch (error) {
        console.log(error)
        return re.status(500).json({ message: `Register User Error : ${error.message}` })
    }
}
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "All Fields are mandatory" });
        }



        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))){
       return res.status(400).json({ message: "Invalid Credentials" });
        }
        res.status(200).json({
            id: user._id,
            user,
            token : generateToken(user._id)
        })

        

        
    } catch (error) {
        console.log(error)
        return re.status(500).json({ message: `Login User Error : ${error.message}` })
    }
}
exports.getUserInfo = async (req, res) => { 
try {
    const user = await User.findById(req.user.id).select("-password");
    if(!user){
        return res.status(400).json({message : "User Not found"});
    }
    res.status(200).json(user);
    
 } catch (error) {
        console.log(error)
        return re.status(500).json({ message: `get User Error : ${error.message}` })
    }}
