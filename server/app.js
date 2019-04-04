const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const path = require('path');
const createError = require('http-errors');
const bodyParser = require('body-parser');
const yargs = require('yargs');
const routes = require('./routes');
const signinService = require('./services/SpeakerService');
const signupService = require('./services/FeedbackService');

// var app = express();

// const port = process.env.PORT || 8080
// app.set('view engine', 'hbs');
module.exports = (config) => {
	const app = express();
	app.set('view engine', 'hbs');
	hbs.registerPartials(__dirname + '/views/partials');
	app.set('views', path.join(__dirname, './views'));
	app.use('/', express.static(path.join(__dirname, '../public')));


	app.locals.title = config.sitename;
	  
	//local host and connect the main page
	app.get('/', (Request,Response) => {
    Response.render('main.hbs', {
        title: 'Main'
    });
	});
  	app.get('/favicon.ico', (req, res) => res.sendStatus(204));

	app.use(bodyParser.urlencoded({ extended: true }));
	  //connect the sign up page and get data
	app.get('/signup',(Request,Response)=> {
	Response.render('signup.hbs', {
		title: 'Sign up'
	});
	//connect game page
	app.get('/game', (Request,Response)=> {
	Response.render('game.hbs',{
		title:'game'
	});
	});

// app.listen(port,()=>{
//     console.log('Server is listening')
// });

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
});
return app;
}


