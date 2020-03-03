const express = require('express');
const router = express.Router();
const userController = require('./controllers/userController')
const userValidation = require('./utils/userValidation')
const passport= require('passport')
require('../../lib/passport')
const flash = require('connect-flash')


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
//register
router.get('/register',(req,res)=>{
  res.render('auth/register',{errors:req.flash('errors')})
})
router.post('/register',userValidation ,userController.register)

//login
router.get('/login',(req,res)=>{
  return res.render('auth/login',{errors:req.flash('errors')})
  
})
router.post('/login',passport.authenticate('local-login',{
  successRedirect:'/',
  failureRedirect:'/api/users/login',
  failureFlash:true
}))

//profile routes

router.get('/profile',(req,res)=>{
  if(req.isAuthenticated()){
    res.render('auth/profile')
  }else{
    res.send('Unauthorized')
  }
})


module.exports = router;
