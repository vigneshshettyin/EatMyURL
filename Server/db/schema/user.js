const mongoose = require("mongoose");
const bcrypt = require('bcrypt')

const userSchema = mongoose.Schema({
    username : String,
    email : String,
    password: String
})

userSchema.pre('save',async function(next){
    try{
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(this.password,salt)
        this.password = hashedPassword
    }
    catch(e){
        next(error)
    }
})

const User = mongoose.model('User',userSchema)



module.exports = {
    User
}