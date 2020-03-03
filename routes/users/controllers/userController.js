const User = require('../models/User')
const mongoose = require('mongoose')
const {validationResult}= require('express-validator')
const flash =require('connect-flash')
const passport = require('passport')
const faker = require('faker')

module.exports={
    register:(req,res,next)=>{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(422).json({errors:errors.array()})
        }
        const{name,email,password} = req.body
        User.findOne({email}).then((user)=>{
            if(user) return res.render('auth/register',{errors:'user already exists'})
            else{
            const newUser = new User()
            
            newUser.profile.name = name
            newUser.profile.picture = faker.image.avatar()
            newUser.email = email
            newUser.password = password

            
            newUser.save().then((user)=>{
                req.login(user,err=>{
                    if(err) return res.status(400).json({confirmation :false,message:err})
                    else{
                        res.redirect('/')
                        next()
                    }
                })
              }).catch(err => next(err))
            }
        })
        
    },


    
    // register: async(req,res,next)=>{
    //     const errors = validationResult(req)
    //     const {name,email,password} =req.body
    //     if(!errors.isEmpty()) return res.status(422).json({errors:errors.array()})

    //     let user = await User.findOne({email})

    //     try {
    //         if(user){
    //             return res.status(200).json({message:' User already exist',})
    //         }

    //         user = await User.create({
    //             ['profile.name']:name,
    //             email:email,
    //             password:password
    //         })
    //         return res.status(200).json({message:'user created',user})
    //     } catch (error) {
    //         return next(error)
    //     }
    // }
}