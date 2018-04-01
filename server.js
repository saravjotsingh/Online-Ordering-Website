var express = require("express");
var hbs = require("hbs");
var bodyParser = require("body-parser");
var mongoose = require('mongoose');
var flash = require('connect-flash');
var passport = require("passport");
var expressSession = require("express-session");
var LocalStrategy   = require('passport-local').Strategy;
var cookieParser = require('cookie-parser');


//Models Schema
var {User} = require("./models/users.js");
var {Dish} = require("./models/dish.js")
var {Admin} = require("./models/admin.js");


mongoose.Promise = global.Promise;



var db = mongoose.connect('mongodb://localhost:27017/Users');





mongoose.connection.once('connected',()=>{
  console.log("Connected to user database");
})

var app = express();

//middlewares

app.use(express.static(__dirname + '/views'));
app.use(cookieParser());
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



////////////////////Admin Panel////////////////////////////////////////////////////////////////////////


app.get("/adminLogin",(req,res)=>{
  res.render("adminLogin",{messages:req.flash("loginmessage")});
});


passport.use('AdminLogin',new LocalStrategy({
  usernameField:'Id',
  passwordField:'Password',
  passReqToCallback:true
},function(req,username,password,done){
  Admin.findOne({'Id':username,'password':password},function(err,user){
    if(err){
      return done(err);
    }
    if(!user){
      console.log("User not found");
      return done(null,false,req.flash('loginmessage',"Oops! Wrong Password and Id"));
    }

    return done(null,user);
  })

}));




app.post("/AdminLogin",passport.authenticate("AdminLogin",{
  successRedirect:'/loggedinAdmin',
  failureRedirect:'/adminLogin',
  failureflash:true
}));



app.get("/loggedinAdmin",isAdminAuthenticated,(req,res)=>{
  console.log("Hello " + req.user.name);
  Dish.find({},(err,docs)=>{
      res.render("adminPanel",{data:docs,user:req.user});
  })

});



function isAdminAuthenticated(req, res, next) {
 if (req.isAuthenticated()){
   return next();
 }
 res.redirect('/adminLogin');
}


app.get('/adminLogout',(req,res)=>{
  req.logout();
  res.redirect('/adminLogin');
})




app.get("/registerAdmin",(req,res)=>{
  res.render("adminRegister",{messages:req.flash("registerMessage")})
});




passport.use("registerAdmin",new LocalStrategy({
  usernameField:'Id',
  passwordField:'password',
  passReqToCallback:true
},function(req,username,password,done){
  Admin.findOne({'Id':username},function(err,user){
    if(user){
      return done(null,false,req.flash('registerMessage',"Id already registered"));
    }else{
        var admin = new Admin();
        admin.name = req.param('name');
        admin.Id = username;
        admin.contact = req.param('number');
        admin.email = req.param('email');
        admin.password = password;
        admin.type = "Admin";

        admin.save(function(err,user){
          if(err){
            throw err;
          }
          return done(null,user);
        });
    }
  });


}));
/////////////////////////////////////////////



app.post("/registerAdmin",passport.authenticate("registerAdmin",{
  successRedirect:'/adminLogin',
  failureRedirect:'/registerAdmin',
  failureflash:true
}));



app.post("/deleteDish",(req,res)=>{
  console.log(req.body.dishToDelete);
  Dish.remove({"dishName":req.body.dishToDelete},function(err,docs){
    if(err){
          console.log("eerr");
    }else{
        console.log("deleted");
        res.send(docs);
    }
  })

})


//
// app.post('/adminPage',(req,res)=>{
//   if(req.body.lUsername=="admin" && req.body.lPassword=="admin"){
//   res.render("addDish");
// }
//});

app.get('/AddDish',(req,res)=>{
  res.render("addDish");
})

///////////////////////////////////////////////////////////////////////////////////////////////////////////
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
  console.log(user.id);
  done(null, user._id);
});

///here is the problem we are doing deserializeUser by User database be have to mske diff to do Admin work and Employee work
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    if(user)
      {done(err, user);}
    else{
      Admin.findById(id, function(err, user){
        done(err,user);
      });
    }
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

//passport authentication for  Student registration

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
        user.type = "Student";

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

///

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
    res.redirect("/loggedinAdmin");
  }
})

})


app.post("/editDish",(req,res)=>{
  Dish.update({"dishName":req.body.dishEdit},{"price":req.body.priceEdit},function(err){
    if(err){
      console.log(err)
    }else{
      res.redirect('/loggedinAdmin');
    }
  })
  //console.log(req.body);
})

app.get("/cart",isAuthenticated,(req,res)=>{
  res.render("cart");
});



///////////////////////////////////////////////////////EMPLLOYEEEE Panel

app.get('/employeeLogin',(req,res)=>{
  res.render('employeeLogin');
})


app.post("/OrderPlaced",(req,res)=>{
  console.log(req.body.dish);
  console.log(req.body.quantity);
  res.send("done");
})


app.listen(3000,function(){
  console.log("Server is runnning on 3000");
});
