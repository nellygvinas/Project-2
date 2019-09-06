const express = require('express');
const router  = express.Router();
const Posting = require('../models/Posting');
const Child = require('../models/Child');
const User = require('../models/User');

const fileUploadMiddleWare = require('../config/cloudinary-file');


// LOAD HOME FEED =================================

router.get('/', (req, res, next)=>{
  if(!req.user){
    req.flash('Error', 'Please login to view.')
    //res.redirect('/')
  }
  console.log('SESSION------------------------')
  console.log(req.user)
  console.log('-------------------------------')
  
  Child.find()
  .then((children)=>{

    Posting.find()
    .then((posts) => {

    console.log(children)
    console.log(posts)

     let childList = children.map((eachChild)=>{
        if(eachChild.creator.equals(req.user._id)){
        eachChild.owned = true;
        return eachChild
        } else{
        console.log("No children found for this user.")
        }
      })
  
     let postList = posts.map((eachPost)=>{
        if(eachPost.creator.equals(req.user._id)){
          eachPost.owned = true;
          return eachPost
        } else {
          console.log("No postings found for this user.")
        }
      })
    
    res.render('home-feed', {listOfChildren: childList, listOfPosts: postList});
  })
  .catch((err)=>{
    next(err)
  })
 })
  .catch((err)=>{
  next(err)
  })

}) // end of get request for home feed.


// CREATE CHILD  =================================

router.get('/new-child', (req, res, next)=>{
  res.render('create-child')
  //res render the view for the new child page when the get request for the page is received.
})


router.post('/create-child', fileUploadMiddleWare.single('childImage'), (req, res, next)=>{
  let newName = req.body.theName;
  let newDOB = req.body.theDateOfBirth;
  let image = '/images/no-avatar.jpg';

  if(req.file){
    image =  req.file.url;
  }

    Child.create({
      name: newName,
      dob: newDOB,
      image: image,
      creator: req.user._id
    })
    .then(()=>{

      req.flash('success','New Child successfully added')

      res.redirect('/feed')
      //res redirect take a url as the argument
    })
    .catch((err)=>{
      next(err)
    })
})


// GET CHILD DETAILS =================================

router.get('/details/:idVariable', (req, res, next)=>{
  const theID = req.params.idVariable;
  
  Child.findById(theID)
  .then((result)=>{
    res.render('child-details', {theSingleChild: result})
  })
  .catch((err)=>{
    next(err)
  })
  })


// REMOVE CHILD =================================

router.post('/:id/remove', (req, res, next)=>{
  const id=req.params.id;

  Child.findByIdAndRemove(id)
  .then((childRemoved)=>{
   
    req.flash('success','Child removed')

    res.redirect('/feed')
    //res redirect take a url as the argument
  })
  .catch((err)=>{
    next(err);
  })
})



// NEW POST =================================
//router.post('')



// CHILD FEED =================================

router.get('/feed/:id', (req, res, next)=>{
  
 // const childId = 
  
  Child.find()
  .then((children)=>{

    Posting.find()
    .then((posts) => {

    console.log(children)
    console.log(posts)

     let childList = children.map((eachChild)=>{
        if(eachChild.creator.equals(req.user._id)){
        eachChild.owned = true;
        return eachChild
        } else{
        console.log("No children found for this user.")
        }
      })
  
     let postList = posts.map((eachPost)=>{
        if(eachPost.creator.equals(req.user._id)){
          eachPost.owned = true;
          return eachPost
        } else {
          console.log("No postings found for this user.")
        }
      })
    
    res.render('home-feed', {listOfChildren: childList, listOfPosts: postList});
  })
  .catch((err)=>{
    next(err)
  })
 })
  .catch((err)=>{
  next(err)
  })

})



module.exports = router;