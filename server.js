const express = require('express');
const ejs = require('ejs');
const expresslayout = require('express-ejs-layouts');
const path = require('path');
const app = express();
const PORT = 3000;


app.use(express.static('public'))



//set tamplet engine....
app.use(expresslayout);
app.set('views',path.join(__dirname,'/resources/views'));
app.set('view engine','ejs');

app.get("/",(req,res)=>
{
    res.render('home');
})

app.get("/cart",(req,res)=>
{
    res.render("customers/cart");
})

app.get("/login",(req,res)=>
{
    res.render("auth/login");
})

app.get("/register",(req,res)=>
{
    res.render("auth/register");
})


app.listen(PORT,()=>
{
    console.log(`listening on port no ${PORT}`);
    console.log("hello");
})