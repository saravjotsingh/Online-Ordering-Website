var express = require("express");
var hbs = require("hbs");
var bodyParser = require("body-parser");
var mongoose = require('mongoose');
var flash = require('connect-flash');

//Models Schema
var {User} = require("./models/users.js");
var {Dish} = require("./models/dish.js")

mongoose.Promise = global.Promise;



var db = mongoose.connect('mongodb://localhost:27017/Users');

mongoose.connection.once('connected',()=>{
  console.log("Connected to user database");
})

var app = express();

//middlewares

app.use(express.static(__dirname + '/views'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//set handlebars for frontend
app.set('view engine','hbs');

app.get('/register',(req,res)=>{
  res.render('register.hbs',);
  //res.send("hello");
})

//we have to use this for authentication in login...next()
// app.use("/",(req,res,next)=>{
//   next();
// })

app.get('/',(req,res)=>{
  res.render('login');
});

app.post('/placeOrder',(req,res)=>{
  //console.log(req.body);
  if(req.body.lUsername=="admin" && req.body.lPassword=="admin"){
    res.render('addDish');
  }else{
    User.findOne({
      rollNo:req.body.lUsername,
      password:req.body.lPassword
    }).then((docs)=>{
      //res.send("Welcome " + docs.name);
      //console.log(docs);
      Dish.find({}).then((  docs)=>{
        console.log(docs);
      },(e)=>{
        console.log(e);
      });
      res.render('mainPanel',)
    },(e)=>{
      res.render('login');
    });
  }


})

// app.post('/loggedin',(req,res)=>{
//   console.log(req.body);
//   res.redirect('/');
// });

app.post("/register",(req,res)=>{
  console.log(req.body);
  var user = new User({
    name:req.body.name,
    rollNo:req.body.rollno,
    contact:req.body.number,
    email:req.body.email,
    password:req.body.password
  });

  user.save(function(err){
    if(err){

      res.render("register",{data:"Their is error in your form.Please Fill data Correctly"});
    }else{
      res.redirect('/');
    }
  })
});


app.post('/recepieAdded',(req,res)=>{
  console.log(req.body);

  var dish = new Dish({
  dishName:req.body.name,
  price:req.body.price,
  course:req.body.category
});

dish.save(function(err){
  if(err){
    console.log(err);
    res.render("addDish",{data:"Dish not added Please Add again"});
  }else{
    res.redirect("/");
  }
})

})

app.listen(3000,function(){
  console.log("Server is runnning on 3000");
});
