const express = require('express');
const router = express.Router();
const Posting = require('../models/Posting');
const Child = require('../models/Child');
const User = require('../models/User');

const fileUploadMiddleWare = require('../config/cloudinary-file');


// LOAD HOME FEED =================================

router.get('/', (req, res, next) => {
  if (!req.user) {
    req.flash('Error', 'Please login to view.')
    //res.redirect('/')
  }
  console.log('SESSION------------------------')
  console.log(req.user)
  console.log('-------------------------------')

  Child.find()
    .then((children) => {

      Posting.find()
        .then((posts) => {

          console.log(children)
          console.log(posts)

          let childList = children.map((eachChild) => {
            if (eachChild.creator.equals(req.user._id)) {
              eachChild.owned = true;
              return eachChild
            } else {
              console.log("No children found for this user.")
            }
          })

          // let postList = posts.map((eachPost) => {
          //   if (eachPost.creator.equals(req.user._id)) {
          //     eachPost.owned = true;
          //     return eachPost
          //   } else {
          //     console.log("No postings found for this user.")
          //   }
          // })

          res.render('home-feed', { listOfChildren: childList/*,listOfPosts: postList*/ });
        })
        .catch((err) => {
          next(err)
        })
    })
    .catch((err) => {
      next(err)
    })

}) // end of get request for home feed.


// CREATE CHILD  =================================

router.get('/new-child', (req, res, next) => {
  res.render('create-child')
  //res render the view for the new child page when the get request for the page is received.
})


router.post('/create-child', fileUploadMiddleWare.single('childImage'), (req, res, next) => {
  let newName = req.body.theName;
  let newDOB = req.body.theDateOfBirth;
  let image = '/images/no-avatar.jpg';

  if (req.file) {
    image = req.file.url;
  }

  Child.create({
    name: newName,
    dob: newDOB,
    image: image,
    creator: req.user._id
  })
    .then(() => {

      req.flash('success', 'New Child successfully added')

      res.redirect('/feed')
      //res redirect take a url as the argument
    })
    .catch((err) => {
      next(err)
    })
})


// GET CHILD DETAILS =================================

router.get('/details/:idVariable', (req, res, next) => {
  const theID = req.params.idVariable;

  Child.findById(theID)
    .then((result) => {
      res.render('child-details', { theSingleChild: result })
    })
    .catch((err) => {
      next(err)
    })
})


// REMOVE CHILD =================================

router.post('/:id/remove', (req, res, next) => {
  const id = req.params.id;

  Child.findByIdAndRemove(id)
    .then((childRemoved) => {

      req.flash('success', 'Child removed')

      res.redirect('/feed')
      //res redirect take a url as the argument
    })
    .catch((err) => {
      next(err);
    })
})


// CHILD FEED =================================

<<<<<<< HEAD
router.get('/:childId', (req, res, next) => {

  const childId = req.params.childId

  Child.findById(childId)
    .then((child) => {

      Posting.find()
        .then((posts) => {


          let postList = posts.map((eachPost) => {
            if (eachPost.creator.equals(req.user._id)) {
              eachPost.owned = true;
              return eachPost
            } else {
              console.log("No postings found for this user.")
            }
          })

          res.render('child-feed', { theChild: child, listOfPosts: postList });
        })
        .catch((err) => {
          next(err)
        })
    })
    .catch((err) => {
      next(err)
    })
=======
router.get('/:childId', (req, res, next)=>{
  
 const childId = req.params.childId 
  
  Child.findById(childId)
  .then((child)=>{

    Posting.find()
    .then((posts) => {

      // let postList = posts.map((eachPost)=>{
      // if(eachPost.creator.equals(req.user._id)){
      //   eachPost.owned = true;
      //   return eachPost
      // } else {
      //   console.log("No postings found for this user.")
      // }
      // })
    
    res.render('child-feed', {theChild: child/*, listOfPosts: postList*/});
  })
  .catch((err)=>{
    next(err)
  })
 })
  .catch((err)=>{
  next(err)
  })
>>>>>>> a7ba61bd3fb69937f7cf5d4624c6fff4f69442e5

})


// CREATE POST ====================================================

router.post('/:childId/new-post', fileUploadMiddleWare.single('artImage'), (req, res, next)=>{
  
  const childId = req.params.childId 
  let artTitle = req.body.artTitle;
  let dateCreated = req.body.dateCreated;
  let description = req.body.description
  let image = '/images/no-art.jpg';

  // posting model: 
  // title: String,
  // creation: Date,
  // description: String,
  // image: String,
  // child: [{type: Schema.Types.ObjectId, ref: 'Child'}],
  // creator: {type: Schema.Types.ObjectId, ref: 'User'}

  if (req.file) {
    image = req.file.url;
  }

  Child.findById(childId)
    .then((child)=> {
    
      Posting.create({
        title: artTitle,
        creation: dateCreated,
        description: description,
        image: image,
        child: childId,
        creator: req.user._id
       })
      .then((post) => {
  
        req.flash('success', 'New art successfully added')
  
        res.render('child-feed', {childPosts: post, theChild: child})
        
      })
      .catch((err) => {
        next(err)
      })

     })
    .catch((err)=>{
    next(err)
    }) // end of .catch for childfindbyid

}) // end of router.post



































module.exports = router;