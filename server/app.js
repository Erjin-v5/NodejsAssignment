const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const path = require('path');
const createError = require('http-errors');
const bodyParser = require('body-parser');
const UserModel = require('./models/usermodel');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const auth = require('./lib/auth');


module.exports = (config) => {
	const app = express();
	app.set('view engine', 'hbs');
	hbs.registerPartials(__dirname + '/views/partials');
	app.set('views', path.join(__dirname, './views'));
	app.use('/', express.static(path.join(__dirname, '../public')));

  //save database json file
  app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({
		extended:true
  }));
  //use cookies to do login page
  app.use(cookieParser());

	app.locals.title = config.sitename;
	  
	//local host and connect the main page
	// app.get('/', (Request,Response) => {
  //   Response.render('main.hbs', {
  //       title: 'Main'
  //   });
  //load login
  app.use(session({
    secret: 'you are beautiful',
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({mongooseConnection: mongoose.connection})
  }));

  //passport check and login database info
  app.use(auth.initialize);
  app.use(auth.session);
  app.use(auth.setUser);

  app.get('/favicon.ico', (req, res) => res.sendStatus(204));


	app.get('/signup',(req,res) => res.render('signup', { success: req.query.success}));
  
  app.get('/game', (req,res)=> {
    return res.render('game.hbs')
  })
	
  app.post('/signup', async(req,res,next)=>{
        try {
          const user = new UserModel({
            _id: new mongoose.Types.ObjectId(),
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
          });
          /* There is something wrong with the saved User  */
          const savedUser = await user.save();
          if (savedUser) {
          return res.redirect('/')
          }else
          {return next(new Error('Failed to save user for unknown reasons'));
        }
        } catch (err) {
          return next(err);
        }
      });
  //login : check the data
  

  //logout: log out an account
  
  

app.use('/',  (req, res) => {
  try {
    req.session.visits = req.session.visits ? req.session.visits + 1 : 1;
	  return res.render('main.hbs', { page: 'Home' });
  } catch(err){
    return next();
  }
});

 // catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
  });

  if (app.get('env') === 'development') {
  app.locals.pretty = true;
  }

// error handler
//   eslint-disable-next-line no-unused-vars
  	app.use((err, req, res, next) => {
    res.locals.message = err.message;
    const status = err.status || 500; // If no status is provided, let's assume it's a 500
    res.locals.status = status;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(status);
    res.render('error');
  });
return app;
}


