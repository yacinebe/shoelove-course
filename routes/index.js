const express = require("express");
const router = new express.Router();
const userModel = require ('../models/User.js');
const bcrypt  = require ("bcrypt");
const bcryptSalt  = 10;
const salt =bcrypt.genSaltSync (bcryptSalt);




router.get(["/", "/home"], (req, res) => {
  res.render("index");
});

router.get(["/collection", "/kids", "/women", "/men"], (req, res) => {
  res.render("products");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.post("/signup", (req, res) => {

  const { firstname, lastname, email, password} = req.body;

  userModel.findOne ({"firstname": firstname, "lastname": lastname})
  .then (queryResult => { 
    
     if (queryResult !== null)  { 
       
      console.log ("user found"); 
      res.render ("signup", { errorMessage: "This user already exist - Please use a different one"})
    
     }   
     
     else 

     {

      console.log ("I am dealing with a new user");

      const hashpwd=bcrypt.hashSync (password, salt);


      userObject = {firstname, lastname, email, password:hashpwd};
      console.log (userObject);
      userModel.create (userObject)
        .then ( () => {res.redirect ('/'); console.log ("Account created")})
        .catch (err=> console.log ("sign up did not work"))


     }
   
})  .catch (err => "username query does not work");

});



router.get("/login", (req, res) => {
  res.render("login");
});


router.post("/login", (req, res, next) =>{
  console.log(req.body)
})


router.get("/one-product", (req, res) => {
  res.render("one_product");
});

module.exports = router;
