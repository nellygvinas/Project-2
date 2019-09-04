const express = require('express');
const router  = express.Router();
const Posting = require('../models/Posting');
const Child = require('../models/Child');

router.post('/api/feed/new-post', (req, res, next)=>{
  
  Posting.create({ 
      title: req.body.postTitle,
      creation: req.body.postDate,
      description: req.body.postDescription,
      image: req.body.postImage,
      child: req.body.postChildId
  })
  .then((response)=>{
      res.json({msg: 'json-ified!'});
  })  
  .catch((err)=>{
      console.log(err);
  })

})


module.exports = router;