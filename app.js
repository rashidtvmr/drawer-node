const db_url = "mongodb+srv://rashidtvmr:Mass94877348@cluster0.uppi8.mongodb.net/sample?retryWrites=true&w=majority";
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/users', usersRouter);

app.get('*', function(req, res) {
    res.sendFile('index.html', {root: path.join(__dirname, 'public')});
  });

mongoose.connect(db_url, () => {
    console.log('DB connected');
});


module.exports = app;
