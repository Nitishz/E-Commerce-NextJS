import User from '../../models/User'
import connectDb from '../../middleware/mongoose'
const bcrypt = require("bcrypt");

const handler = async (req, res) => {
    if (req.method =='POST') {
        const user = new User(req.body)
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        await user.save()
        res.status(200).json({success: 'success'})
    }
    else {
        res.status(400).json({error: 'This method is not allowed'})
    }
}

export default connectDb(handler);