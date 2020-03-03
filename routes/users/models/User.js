const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const passport = require('passport')
require('../../../lib/passport')

const UserSchema = new mongoose.Schema({
    email:{type:String,unique:true,lowercase:true,trim:true,required:true},
    password:{type:String,required:true},
    profile:{
        name:{type:String,default:""},
        picture:{type:String,default:""}
    },
    address:{type:String,default:"(Please Update Address)"}
})

// hash password here so we dont have to do it later when we actually create the user

// must not use arrow function for call back
UserSchema.pre('save',function(next){
    const user = this
    //if(!user.isModified('password')) return next()

// encrypt the password and hash assign password key the value of hash
    bcrypt.genSalt(10,(err,salt)=>{
        if(err)return next(err)
        bcrypt.hash(user.password,salt,(err,hash)=>{
            if(err) return next(err)
            user.password = hash
            next()
        })
    })
})
module.exports=mongoose.model('User',UserSchema)