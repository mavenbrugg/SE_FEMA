var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var femaDirectorRouter = require('./routes/fema_director');
var femaDirectorItemsRouter = require('./routes/fema_director_items');
var femaDirectorLaborRouter = require('./routes/fema_director_labor');
var supplierRouter = require('./routes/supplier');
var distCenterRouter = require('./routes/dist_center');
var driverRouter = require('./routes/driver');
var driverViewRouter = require('./routes/driver_view');
var skilledWorkerRouter = require('./routes/skilled_worker');
var skilledWorkerViewRouter = require('./routes/skilled_worker_view');
var createUser = require('./routes/create_user');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/fema_director', femaDirectorRouter);
app.use('/fema_director/items', femaDirectorItemsRouter);
app.use('/fema_director/labor', femaDirectorLaborRouter);
app.use('/supplier', supplierRouter);
app.use('/dist_center', distCenterRouter);
app.use('/driver', driverRouter);
app.use('/driver/view', driverViewRouter);
app.use('/skilled_worker', skilledWorkerRouter);
app.use('/skilled_worker/view', skilledWorkerViewRouter);
app.use('/create_user', createUser);

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
