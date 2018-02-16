var express = require("express");
var hbs = require("hbs");
var bodyParser = require("body-parser");
var mongoose = require('mongoose');
var flash = require('connect-flash');
var {User} = require("./models/users.js");

//mongoose.Promise = global.Promise;

var db = mongoose.connect('mongodb://localhost:27017/Users');

mongoose.connection.once('connected',()=>{
  console.log("Connected to user database");
})

var app = express();


//app.use(flash());
//app.use(express.static(__dirname + 'views'));
app.use(express.static(__dirname + '/views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.set('view engine','hbs');

app.get('/register',(req,res)=>{
  res.render('register.hbs');
})

//we have to use this for authentication in login...next()
// app.use("/",(req,res,next)=>{
//   next();
// })

app.get('/',(req,res)=>{
  res.render('login');
});

app.post('/loggedin',(req,res)=>{
  console.log(req.body);
  res.redirect('/');
});

app.post("/registered",(req,res)=>{
  console.log(req.body);
  var user = new User({
    name:req.body.name,
    rollNo:req.body.rollno,
    contact:req.body.number,
    email:req.body.email,
    password:req.body.password
  });

  user.save().then((docs)=>{
    res.redirect('/');
  },(e)=>{
    res.send("Something went wrong register again");
    })
});


app.listen(3000,function(){
  console.log("Server is runnning on 3000");
});
