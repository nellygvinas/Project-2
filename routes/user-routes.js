const express = require('express');
const router  = express.Router();
const User    = require('../models/User');

const bcrypt = require('bcryptjs');

const passport = require("passport");


router.get('/', (req, res, next)=>{
  res.render('index')
})

// Signup form will be a post request to the homepage. The form is on the homepage view.
router.post('/signup', (req, res, next)=>{

    let username = req.body.theUsername;
    let pword = req.body.thePassword;

  if(!username || !pword){
    req.flash('Error', 'Please provide both username and password.')
    //res.redirect('/')
  }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(pword, salt);

    User.create({username: username, password: hashedPassword})
    .then(()=>{
      req.flash('Success', 'Your account has been created.')
        res.redirect('/')
    })
    .catch((err)=>{
        next(err)
    })
})


router.post('/login', passport.authenticate("local", {
  successRedirect: "/feed",
  failureRedirect: "/",
  failureFlash: true,
  passReqToCallback: true
}));


  // old version without passport
  //   const uName = req.body.theUsername;
  //   const pword = req.body.thePassword;

  // User.findOne({ "username": uName })
  // .then(user => {
  //     if (!user) {
  //       res.redirect('/')
  //     }
  //     if (bcrypt.compareSync(pword, user.password)) {
  //       // Save the login in the session!
  //       req.session.currentlyLoggedIn = user;
  //       res.redirect("/celebrities");
  //     } else {
  //       res.render("auth/login", {
  //         errorMessage: "Incorrect password"
  //       });
  //     }
  // })
  // .catch(error => {
  //   next(error);
  // })
  // begin new version with passport

// })

router.post('/logout', (req, res, next)=>{
  req.logout();
  res.redirect('/')
})

// Viewing a secret page
// router.get('/secret' ,(req, res, next)=>{
//   if(!req.user){
//     req.flash('error', 'please log in to view the secret page')
//     res.redirect('/login')
//   }
//         res.render('secret') 
// })


module.exports = router;