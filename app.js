const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose')
const flash = require('connect-flash')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const passport = require('passport')
require('./lib/passport')

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users/userRoutes');

const app = express();
require('dotenv').config()

mongoose.connect(process.env.MONGODB_URI,{
  useNewUrlParser:true,
  useUnifiedTopology:true,
  useCreateIndex:true
}).then(()=>{
  console.log('Mongodb Connected')
}).catch(err=> console.log(`mongo error:${error}`))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')))
app.use(flash());

app.use(session({
  resave:true,
  saveUninitialized:true,
  secret:process.env.SESSION_SECRET,
  store: new MongoStore({
      url: process.env.MONGODB_URI,
      mongooseConnection:mongoose.connection,
      autoReconnect:true
  }),
  cookie:{
      secure:false,
      maxAge:600000,
  }
}))

app.use(passport.initialize())
app.use(passport.session())

app.use((req,res,next)=>{
  res.locals.user = req.user
  next()
})


app.use('/', indexRouter);
app.use('/api/users', usersRouter);

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
