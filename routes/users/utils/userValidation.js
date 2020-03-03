const {check} =require('express-validator')
const userValidation = [
    check('name','Name is required').not().isEmpty(),
    check('email','Please check valid Email').isEmail(),
    check('password','Please make sure it is of 3 or more characters').isLength({min:3})
  ]


  module.exports = userValidation