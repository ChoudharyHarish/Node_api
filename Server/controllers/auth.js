import User from "../Models/user.js";

const signUp = async (req, res) => {
    const {name, phoneNumber, password, confirmPassword } = req.body; 
    if (confirmPassword !== password) return  res.status(404).json({ msg: "Password not matches" })
    if(!name || !phoneNumber || !password || !confirmPassword) return res.status(404).json({msg:"Missing credentials !! "});

    try {
        const exists = await User.findOne({phoneNumber});
        if(exists){
            return res.status(404).json({msg:"Phone Number Already in Use Try Another"});
        }
        const user = await User.create({ name, phoneNumber, password });
        const token = user.createJWT();
        // If we want to display user name can use this response directly instead of decoding token
        return res.status(200).json({ name: user.name, userId: user._id, token });
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Internal Server Error" })
    }
}


const signIn = async (req, res) => {
    const { phoneNumber, password } = req.body;


    const user = await User.findOne({ phoneNumber });
    if (!user) {
        return res.status(202).json({ msg: "Invalid Mobile Number" });
    }

    const isCorrect = user.comparePassword(password);
    if (!isCorrect) {
        res.status(202).json({ msg: "Invalid Credentials" });
    } 
    const token = user.createJWT();
    res.status(200).json({ name: user.name, userId: user._id, token })
}

export { signUp,signIn };

