const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('./../models/userModel')

class Users {
    static Login = async (req,res,next) =>{
        try {
            const {email, password} = req.body;
            const exist = await User.findOne({email});
            if (!exist) {
                return res.status(401).json({
                    message: 'Error! Either email or Password Wrong'
                })
            } else {
                let pass = bcrypt.compareSync(password, exist.password)
                if (!pass) {
                    return res.status(401).json({
                        message: 'Error! Either email or Password Wrong'
                    })  
                } else {
                    const token = jwt.sign({name:exist.name, email: exist.email, role: exist.role, id: exist._id}, 'secret-key');
                    res.status(200).json({
                        token
                    })
                }
            }
        } catch (error) {
            // next(error)
            console.log(error)
        }
    }
    static getProfile = async (req, res, next) => {
       try {
            const own = await User.findOne({email: req.user.email}).select('-password -__v');
            res.status(200).json(own)
       } catch(err) {
           console.log(err)
       }
    }
}

module.exports = Users