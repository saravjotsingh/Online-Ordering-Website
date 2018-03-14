var express = require("express");
var hbs = require("hbs");
var bodyParser = require("body-parser");
var mongoose = require('mongoose');
var flash = require('connect-flash');
var passport = require("passport");
var expressSession = require("express-session");
var LocalStrategy   = require('passport-local').Strategy;



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


//passport middlewares
app.use(expressSession({secret:"mySecret"}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


//set handlebars for frontend
app.set('view engine','hbs');



app.get('/',(req,res)=>{
  res.render('frontPage');
});

app.get("/studentLogin",(req,res)=>{
  res.render("Login",{messages:req.flash("loginmessage")});
});


app.get('/register',(req,res)=>{
  res.render('register.hbs',{messages:req.flash("registerMessage")});
})



app.get("/adminLogin",(req,res)=>{
  res.render("adminLogin")
})

app.post('/adminPage',(req,res)=>{
  if(req.body.lUsername=="admin" && req.body.lPassword=="admin"){
  res.render("addDish");
}
});


// app.post('/placeOrder',(req,res)=>{
//   //console.log(req.body);
//     User.findOne({
//       rollNo:req.body.lUsername,
//       password:req.body.lPassword
//     },function(err,docs){
//       if(err){
//         res.redirect("/");
//       }else{
//         Dish.find({},function(err,docs){
//           res.render("mainPanel",{data:docs});
//         });
//       }
//     });
///////////////////////////////////////////////////

//Passprt MiddleWAres for routes;

///////////////////////////////////////////////////
passport.use("login",new LocalStrategy({
  usernameField:'lUsername',
  passwordField:'lPassword',
  passReqToCallback:true
},function(req,username,password,done){
  //console.log(username,password);
  User.findOne({'rollNo':username,'password':password},function(err,user){
    if(err){
      return done(err);
    }
    if(!user){
      console.log("User not found");
      return done(null,false,req.flash('loginmessage',"Oops! Wrong Password and Roll No."));
    }

    return done(null,user);
  })
}
));

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});
/////////////////////////////////////////////////////////////////////////////////////////////////////

app.post('/login',passport.authenticate('login',{
  successRedirect:"/placeOrder",
  failureRedirect:"/studentLogin",
  failureflash:true

}));


app.get('/placeOrder',isAuthenticated,(req,res)=>{
    Dish.find({},function(err,docs){
            res.render("mainPanel",{data:docs,user:req.user});
           });
});

app.get("/logout",(req,res)=>{
  req.logout();
  res.redirect('/studentLogin');
})


 function isAuthenticated(req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.redirect('/studentLogin');
}

/////

//passport authentication for registration

/////


passport.use('register',new LocalStrategy({
  usernameField:'rollno',
  passwordField:'password',
  passReqToCallback:true

},function(req,username,password,done){
  User.findOne({'rollNo':username},function(err,user){
    if(user){
      return done(null,false,req.flash('registerMessage',"Roll number is already registered"));
    }else{
        var user = new User();
        user.name = req.param('name');
        user.rollNo = username;
        user.contact = req.param('number');
        user.email = req.param('email');
        user.password = password;

        user.save(function(err){
          if(err){
            throw err;
          }
          return done(null,user);
        })
    }
  });


}));


app.post('/register',passport.authenticate('register',{
  successRedirect:'/studentLogin',
  failureRedirect:'/register',
  failureflash:true
}));

////////////////////////////////////////////////////////////////////////////////////////

// app.post("/register",(req,res)=>{
//   console.log(req.body);
//   var user = new User({
//     name:req.body.name,
//     rollNo:req.body.rollno,
//     contact:req.body.number,
//     email:req.body.email,
//     password:req.body.password
//   });
//
//   user.save(function(err){
//     if(err){
//
//       res.render("register",{data:"Their is error in your form.Please Fill data Correctly"});
//     }else{
//       res.redirect('/');
//     }
//   })
// });


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

app.get("/cart",isAuthenticated,(req,res)=>{

  res.render("cart");



});


app.listen(3000,function(){
  console.log("Server is runnning on 3000");
});
