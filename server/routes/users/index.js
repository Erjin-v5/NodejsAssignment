const express = require('express');
const UserModel = require('../../models/UserModel');

const router = express.Router();

module.exports = () => {
  router.get('/signup',() => res.render('signup', { success: req.query.success }));

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
