const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const path = require('path');
const createError = require('http-errors');
const bodyParser = require('body-parser');
const UserModel = require('./models/usermodel');

module.exports = (config) => {
	const app = express();
	app.set('view engine', 'hbs');
	hbs.registerPartials(__dirname + '/views/partials');
	app.set('views', path.join(__dirname, './views'));
	app.use('/', express.static(path.join(__dirname, '../public')));

	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({
		extended:false
	}));

	app.locals.title = config.sitename;
	  
	//local host and connect the main page
	// app.get('/', (Request,Response) => {
  //   Response.render('main.hbs', {
  //       title: 'Main'
  //   });
  app.get('/favicon.ico', (req, res) => res.sendStatus(204));

	app.get('/game', (req,res) => res.render('game', {success: req.query.success}));

	app.get('/signup',(req,res) => res.render('signup', { success: req.query.success}));

	
  app.post('/signup', async(req,res,next)=>{
        console.log(1)
        try {
          const user = new UserModel({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
          });
          /* There is something wrong with the saved User  */
          const savedUser = await user.save();
    
          if (savedUser) {
          return res.redirect('/sigup?success=true')
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
	return res.render('main.hbs', { page: 'Home' });
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


