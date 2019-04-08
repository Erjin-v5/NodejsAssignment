const express = require('express');
const UserModel = require('../../models/UserModel');
const passport = require('passport');



const router = express.Router();

module.exports = () => {
  // Login feature: make sure user has the right login and password to check with database
  router.post('/', passport.authenticate('local', {
    successRedirect: '/game',
    failureRedirect: '/signup?error=true',
  }))
  router.get('/game',(req,res) => res.render('game', { success: req.query.success },{error: req.query.error}));
  router.get('/',(req,res) => res.render('signup', { success: req.query.success },{error: req.query.error}));
  router.post('/signup', async (req,res,next)=>{
    try{
        const user = new UserModel({
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
        });
        const savedUser = await user.save();

        if (savedUser){
          return res.redirect('/users/signup?success=true');
        }
        return next (new Error('Failed to save user for unknown reasons'));
    }catch (err) {
      return next(err);
    }
  });

  // router.get('/account', (req, res) => res.render('users/account', { user: req.user }));

  return router;
};
