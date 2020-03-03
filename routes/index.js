const express = require('express');
const router = express.Router();
const Product = require('../lib/loader.json')

/* GET home page. */
router.get('/', function(req, res, next) {
  return res.render('main/home', { Product});
});

router.get('/logout',(req,res)=>{
  //get rid of session
  req.logout()
  req.session.destroy()
  console.log(req.session)
  return res.redirect('/')

})

module.exports = router;
