import User from '../../models/User'
import connectDb from '../../middleware/mongoose'


const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');


const handler = async (req, res) => {
    if (req.method =='POST') {
        let user = await User.findOne({'email': req.body.email})
        if (user) {
            const validPassword = await bcrypt.compare(req.body.password, user.password)
            if (req.body.email == user.email && validPassword) {
                var token = jwt.sign({email:user.email, name:user.name}, 'mysecretCodeWeapon', {expiresIn: '2d'});
                res.status(200).json({success: true, token})
            }
            else {
                res.status(400).json({success: false, error: 'Invalid Credentials'})
            }
        }
        else {
            res.status(400).json({success: false, error: 'User not found'})
        }
    }
    else {
        res.status(400).json({success: false, error: 'This method is not allowed'})
    }
}

export default connectDb(handler);