const express = require('express');
const router  = express.Router();
const Posting = require('../models/Posting');
const Child = require('../models/Child');

const fileUploadMiddleWare = require('../config/cloudinary-file');


// The GET request to get the feed once logged in:

router.get('/', (req, res, next)=>{
  if(!req.user){
    req.flash('Error', 'Please login to view.')
    //res.redirect('/')
  }
  console.log('------------------------')
  console.log(req.user)
  
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
    
    res.render('home-feed', {listOfChildren: childList, listOfPosts: posts});
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
    .then((result)=>{

      req.flash('success','New Child successfully added')

      res.redirect('/feed')
      //res redirect take a url as the argument

    })
    .catch((err)=>{
      next(err)
    })
})


// REMOVE CHILD

router.post('/:id/remove', (req, res, next)=>{
  const id=req.params.id;

  Child.findByIdAndRemove(id)
  .then(()=>{
    res.redirect('/feed')
  })
  .catch((err)=>{
    next(err);
  })
})


// GET CHILD DETAILS

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


// REMOVE CHILD

router.post('/:id/remove-child', (req, res, next)=>{
  const id = req.params.id;
  console.log(id)

  Child.findByIdAndRemove(id)
  .then(()=>{
    res.redirect('/feed')
  })
  .catch((err)=>{
    next(err);
  })
})

// NEW POST
router.post('')



// LOGOUT

router.post('/logout', (req, res, next)=>{
  req.logout();
  res.redirect('/')
})




module.exports = router;