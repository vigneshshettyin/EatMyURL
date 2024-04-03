const express = require("express")
const user = express.Router();
const {signinInput,signupInput} = require('../Validations/index')
const {User} = require('../db/schema/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

user.get('/',(req,res)=>{
    return res.json({
        msg : "Server is healthy"
    })
})

user.post('/signup',async (req,res)=>{
    const user = {
        username : req.body.name,
        email : req.body.email,
        password : req.body.password
    }

    const validate = signupInput.safeParse(user)

    if(!validate.success){
        return res.status(411).json({
            msg : "Invalid inputs"
        })
    }

    const response = await User.create(user);

    if(!response){
        return res.status(400).json({
            msg : "Error while signing up"
        })
    }

    const token = jwt.sign({id : response._id},"123");

    return res.status(200).json({
        token
    })
})

user.post('/signin',async (req,res)=>{
    const user = {
        email : req.body.email,
        password : req.body.password
    }

    const validate = signinInput.safeParse(user)

    if(!validate.success){
        return res.status(411).json({
            msg : "Invalid inputs"
        })
    }

    // hashing the password to compare with the database
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt)
    user.password = hashedPassword

    const response = await User.findOne(user);

    if(!response){
        return res.status(404).json({
            msg: "User not found"
        })
    }

    const token = jwt.sign({id : response._id},"123");

    return res.status(200).json({
        token
    })
})

user.get('/validate',(req,res)=>{
    const authorization = req.headers.authorization;
    const token = authorization.split(" ")[1]

    try{
        jwt.verify(token,"123");

        return res.status(200).json({
            msg: "user logged in"
        })
    }
    catch(e){
        return res.status(403).json({
            msg: "user not authorized"
        })
    }
})

module.exports = {
    user
}