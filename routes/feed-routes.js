const express = require('express');
const router  = express.Router();

const Child = require('../models/Child');

router.get('/', (req, res, next)=>{
  if(!req.user){
    req.flash('Error', 'Please login to view.')
    res.redirect('/')
  }
  console.log('------------------------')
  console.log(req.user)
  
  Child.find()
  .then((result)=>{
    // console.log(result)

    let newList = result.map((eachChild)=>{
      if(eachChild.creator.equals(req.user._id)){
        eachChild.owned = true;
        return eachChild
      } else{
        console.log("no children found")
      }
    })
    res.render('home-feed', {listOfChildren: newList});
  })
  .catch((err)=>{
    next(err);

})

})

module.exports = router;