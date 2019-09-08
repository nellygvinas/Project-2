const express = require('express');
const router  = express.Router();
const Posting = require('../models/Posting');
const Child = require('../models/Child');

const fileUploader = require('../config/cloudinary-file');


// router.get('/feed/:childId', (req, res, next)=>{

//     const childId = req.params.childId 
//     const filter = { child: childId }
//     console.log(req.params.childId)

//     Child.findById(childId)
//     .then((child)=>{

//         Posting.find(filter)
//         .then((posts) => {

//         let postList = posts.map((eachPost)=>{
//         if(eachPost.creator.equals(req.user._id)){
//             eachPost.owned = true;
//             return eachPost
//         } else {
//             console.log("No postings found for this user.")
//         }
//         })
        
//         res.render('child-feed', {theChild: child, listOfPosts: postList});
//     })
//     .catch((err)=>{
//         next(err)
//     })
//     })
//     .catch((err)=>{
//     next(err)
//     })

//     })


// 

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

      res.json({msg: 'json-ified!'});
  })  
  .catch((err)=>{
      console.log(err)
  })

})


module.exports = router;