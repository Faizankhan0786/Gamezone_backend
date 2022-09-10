var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var categoryRouter = require('./routes/categories');
var subcategoryRouter = require('./routes/subcategories');
var adminRouter = require('./routes/admin');
var accessoriesRouter = require('./routes/accessories');
var gamesRouter = require('./routes/games');
var termsRouter = require('./routes/terms');
var documentsRouter = require('./routes/documents');
var consolepictureRouter = require('./routes/consolepicture');
var gamespictureRouter = require('./routes/gamespicture');
var accessoriespictureRouter = require('./routes/accessoriespicture');
var userdetailRouter = require('./routes/userdetail');
var smsRouter = require('./routes/smsapi');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/categories', categoryRouter);
app.use('/subcategories', subcategoryRouter);
app.use('/admin', adminRouter);
app.use('/accessories', accessoriesRouter);
app.use('/games', gamesRouter);
app.use('/terms', termsRouter);
app.use('/documents', documentsRouter);
app.use('/consolepicture', consolepictureRouter);
app.use('/gamespicture', gamespictureRouter);
app.use('/accessoriespicture', accessoriespictureRouter);
app.use('/userdetail', userdetailRouter);
app.use('/sms', smsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
