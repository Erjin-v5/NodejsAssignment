const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const yargs = require('yargs');

var app = express();

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






