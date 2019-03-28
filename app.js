const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const yargs = require('yargs');

var app = express();

const port = process.env.PORT || 8080

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/views'));

//**check if recording file exists
var fileExist = () => {
	return new Promise((resolve, reject) => {
		if (fs.existsSync('test.json') == true) {
			resolve(true);
		} else {
			reject('File doesn\'t exist');
		}
	});
};

//**sign in function
/*var signIn = (username, passwd) => {
	return new Promise((resolve, reject) => {

	});
};*/

//**sign up
var specChars = "~`@!#$%^&*+=-[]\\\';,/{}|\":<>?";
var signUp = (username, passwd) => {
	return new Promise((resolve, reject) => {
		for (var i = 0; i < username.length; i++) {
	       if (specChars.indexOf(username.charAt(i)) != -1) {
	           reject('Username cannot contain special charaters');
	       }
	    }
	    resolve(true)
	});
};

//**check if the username has already existed
var checkUsername = (username) => {
	return new Promise((resolve, reject) => {
		var readObj = fs.readFileSync('test.json');
		objList = JSON.parse(readObj);

		for (var record in objList)	{
			if (record == username) {
				reject('Username has already existed');
			};
		};
		resolve(false);
	
	});
};

//**check if the account has already existed
var checkAcc = (username, passwd) => {
	return new Promise((resolve, reject) => {
		var readObj = fs.readFileSync('test.json');
		objList = JSON.parse(readObj);

		for (var record in objList) {
				if ((record == username) && (objList[record].password == passwd)) {
				resolve(true);
			};
		};
		reject('User not found')
	
	});
};


//local host and connect the main page
app.get('/', (Request,Response) => {
    Response.render('main.hbs', {
        title: 'Main'
    });
});

//connect the sign up page and get data
app.get('/signup',(Request,Response)=> {
	Response.render('signup.hbs', {
		title: 'Sign up'
	});
});

//connect game page
app.get('/game', (Request,Response)=> {
	Response.render('game.hbs',{
		title:'game'
	});
});

// //register page then go back to sign in page
// app.get('/', (Request,Response) => {
//     Response.render('main.hbs', {
//         title: 'Main'
//     });
// });



		



//**test code

var name = '@erjin';
var passwd = '122';
/*
fileExist().then((resolve) => {
	return checkAcc(name, passwd);
}).then((resolve) => {
	console.log(resolve);
}).catch((error) => {
	console.log(error);
})
*/
//var name = "erjin";
//var pass = "122";
signUp(name, passwd).then((resolve) => {
	console.log(resolve);
}).catch((error) => {
	console.log(error);
})

app.listen(port,()=>{
    console.log('Server is listening')
});




