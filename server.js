var express = require("express");
var hbs = require("hbs");
var bodyparser = require("body-parser");


var app = express();

app.use(express.static(__dirname + 'views'));
app.use(express.static(__dirname + '/views'));

app.set('view engine','hbs');

app.get('/register',(req,res)=>{
  res.render('register.hbs');
})

app.get('/',(req,res)=>{
  res.render('login');
});


app.listen(3000,function(){
  console.log("Server is runnning on 3000");
})
