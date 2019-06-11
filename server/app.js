require('dotenv').config()

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const express = require('express')
const favicon = require('serve-favicon')
const logger = require('morgan')
const path = require('path')
const cors = require('cors')
const session = require('express-session')
const passport = require('passport')

// require('./configs/passport.config')
require('./config/mongoose.config')




const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();



// configuracion middleware SESSION
app.use(session({
  secret: "Vamo a irno pero vamo a irno como yo quiero, diho",
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());


// configuracion middleware CORS
// const whitelist = [`${process.env.URLLOCAL}:${process.env.PORT}`]
const whitelist = ['http://localhost:5000']
const corsOptions = {
  origin: (origin, cb) => {
    const originIsWhitelisted = whitelist.includes(origin);
    cb(null, originIsWhitelisted)
  }
}
app.use(cors(corsOptions))



// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));



// default value for title local
app.locals.title = 'Express - Generated with IronGenerator';



// const index = require('./routes/index');
// app.use('/', index);

const authRoutes = require('./routes/auth.routes');
app.use('/api', authRoutes);

const ownerRoutes = require('./routes/owner.routes');
app.use('/api', ownerRoutes);

module.exports = app;
