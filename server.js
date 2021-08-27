require('dotenv').config();
const express = require('express');
const ejs = require('ejs');
const expresslayout = require('express-ejs-layouts');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
const session = require("express-session");
const flash = require('express-flash');
const MongoStore = require("connect-mongo")
const passport = require('passport')
const PORT = 3000;


//mongodb

const url = "mongodb://localhost:27017/pizza";

mongoose.connect(url,{

    useNewUrlParser : true,
    useUnifiedTopology:true,
    useCreateIndex:true,
    useFindAndModify:true
});

const connection = mongoose.connection;
connection.on('err',()=>
{
    console.log("not connected database...");
})
connection.once('open',()=>
{
    console.log("connected database...");
})


//session store

let store = new MongoStore({
    mongoUrl: url,
    collection: "sessions"
 });

 app.use(session({
    secret: process.env.cookie_secret,
    resave: false,
    store: store,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, //24 hours
    // cookie: { maxAge: 1000 * 10 }

  }));

  
//passport config

const passportInit = require('./app/config/passport')
passportInit(passport);
app.use(passport.initialize())
app.use(passport.session())


app.use(flash());


app.use(express.static('public'))
app.use(express.urlencoded({ extended : false  }))
app.use(express.json())

//global middleware
app.use((req,res,next)=>
{
    res.locals.session = req.session
    res.locals.user = req.user
    next()
})

//set tamplet engine....
app.use(expresslayout);
app.set('views',path.join(__dirname,'/resources/views'));
app.set('view engine','ejs');

require('./routes/web')(app);

app.listen(PORT,()=>
{
    console.log(`listening on port no ${PORT}`);
    console.log("hello");

})