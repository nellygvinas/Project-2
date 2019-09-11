const express = require('express');
const router  = express.Router();
const Posting = require('../models/Posting');
const Child = require('../models/Child');

const fileUploader = require('../config/cloudinary-file');


router.get('/api/feed/created-post/:id', (req, res, next)=>{

    let id = req.params.id

    console.log(id)

    Posting.findById(id)
    .then((theNewPosting)=>{
        res.json(theNewPosting)
    })
    .catch((err)=>{
        next(err);
    })
})


router.post('/api/feed/new-post', fileUploader.single('postImage'), (req, res, next)=>{
  

  Posting.create({ 
      title: req.body.postTitle,
      creation: req.body.postDate,
      description: req.body.postDescription,
      creator: req.user._id,
      image: req.file.url,
      child: req.body.postChildId
  })
  .then((newPost)=>{

      res.json({msg: 'json-ified!', newPost});
  })  
  .catch((err)=>{
      console.log(err)
  })

})


module.exports = router;