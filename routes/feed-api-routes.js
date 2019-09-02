const express = require('express');
const router  = express.Router();
const Posting = require('../models/Posting');
const Child = require('../models/Child');

router.post('/feed/new-post', (req, res, next)=>{
  
  Posting.create({
      child: req.body., 
      title: req.body.postTitle,
      creation: req.body.postDate,
      description: req.body.postDescription,
      image: req.body.postImage
  })
  .then((response)=>{
      res.json({msg: 'yay, good job'});
  })  
  .catch((err)=>{
      console.log(err);
  })

})






module.exports = router;