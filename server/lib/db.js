const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

module.exports.connect = async dsn => mongoose.connect(dsn,{useNewUrlParser: true});

