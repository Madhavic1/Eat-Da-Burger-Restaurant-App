var express = require("express");
var PORT = process.env.PORT || 8080;
var app = express();
//serve static content for the app from the "public" directory in the application directory
app.use(express.static("public"));

//parse request by JSON
app.use(express.urlencoded({extended : true}));
app.use(express.json());

//setting handlebars
var exphbs = require("express-handlebars");

app.engine("handlebars",exphbs({defaultLayout:"main"}));
app.set("view engine","handlebars");

//import routes and give the server access to them
var routes = require("./controllers/burgers-controller");

app.use(routes);

app.listen(PORT,()=>{
    console.log(`App is started on http://localhost:8080/`);
});