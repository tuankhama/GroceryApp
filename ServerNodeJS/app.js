var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
require('./src/models/user')
require('./src/models/bill')
require('./src/models/category')
require('./src/models/product')


var indexRouter = require('./src/routes/index');
var usersRouter = require('./src/routes/users');
var productsRouter = require('./src/routes/products');
var cartsRouter = require('./src/routes/carts');
var favoritesRouter = require('./src/routes/favorites');
var categoriesRouter = require('./src/routes/categories');
var billsRouter = require('./src/routes/bills');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// connect database
mongoose.connect('mongodb+srv://tuanthachdau:iOfHLqQ1LPbrR8QK@tuan.tw8cbvf.mongodb.net/GroceryApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log(">>> Connect Database Successful <<< "))
  .catch(err => console.log("Database Error: " + err));



app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/carts', cartsRouter);
app.use('/favorites', favoritesRouter);
app.use('/bills', billsRouter);
app.use('/carts', cartsRouter);
app.use('/categories', categoriesRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
