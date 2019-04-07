const express = require('express');

const router = express.Router();
const usersRoute = require('./users');



// Require the index file
// const speakersRoute = require('./speakers');
// const feedbackRoute = require('./feedback');
// const usersRoute = require('./users');
// // const usersRoute = require('./signup');
// const usersRoute = require('./signin');



module.exports = (params) => {
  // Destructuring assignment
  const { speakers } = params;

  // Now let's define the index route and mount it on slash.
  router.get('/', async (req, res) => {
    const speakerslist = await speakers.getListShort();
    const artwork = await speakers.getAllArtwork();
    return res.render('app', { page: 'Home'});
  });

  router.get('/signup',() => {
      usersRoute(params)
  })
  // And mount it to the path speakers.
  // router.use('/speakers', speakersRoute(params));
  // router.use('/feedback', feedbackRoute(params));
  // router.use('/users');

  return router;
};
