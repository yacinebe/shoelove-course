require("dotenv").config();
require("./config/db_connection"); // database initial setup

const express = require("express");
const bodyParser = require ("body-parser")
const hbs = require("hbs");
const app = express();

app.locals.site_url = process.env.SITE_URL;
// used in front end to perform ajax request on a url var instead of hardcoding it

app.set("view engine", "hbs"); //
app.set("views", __dirname + "/views"); //
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


hbs.registerPartials(__dirname + "/views/partials");

const basePageRouter = require("./routes/index");
const adminRouter = require("./routes/admin");

app.use(basePageRouter);
app.use(adminRouter);

const listener = app.listen(process.env.PORT || 8000, () => {
  console.log(
    `app started at ${process.env.SITE_URL}`
  );
});



/* const productModel = require ("./models/Product.js");

 productModel.create ({
    name: "test name 4",
    ref : "test reference",
    sizes : "new size",
    description : "new description",
    price : 10,
    category : "women",
    id_tags: "5d148b66540e3c1ef816f168"
  }
)
.then (dbres => console.log ("this seems to be working and the result is " + dbres))
.catch (err => "this is not working") 

const userModel = require ("./models/User.js");

const bcrypt  = require ("bcrypt");
const bcryptSalt  = 10;
const salt =bcrypt.genSaltSync (bcryptSalt);

userModel.create ({
    firstname: "firstname",
    lastname : "lastname",
    email: "email@email.com",
    password: bcrypt.hashSync ("supersecretpassword", salt)}
)
.then (dbres => console.log ("this seems to be working and the result is " + dbres))
.catch (err => "this is not working") 

const tagModel = require ("./models/Tag.js");

tagModel.create ({
    label: "converse"
})
.then (dbres => console.log ("this seems to be working and the result is " + dbres))
.catch (err => "this is not working") 

productModel.find ({}).populate ("id_tags")
.then ( dbRes => console.log("I am returning a product which is " + (dbRes)))
.catch ( err => "does not work") 

*/