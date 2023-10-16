const express = require("express");
const bodyParser = require("body-parser");
require('dotenv').config();
const path = require("path");
const PortFolio = require("./Model/Portfolio-Model");

// Route  
const pageroute = require("./route/Portfolio-Route");

const app = express();
const port = 4000;

const staticPath  = path.join(__dirname,"/Public");
const templatePath = path.join(__dirname,"/templates/views");


app.set("view engine", "hbs");
app.set("views", templatePath);

app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(staticPath));

//Route
app.use(pageroute);

app.get("/",(req,res) =>{
    res.render("index.hbs");
});

app.get("/cart",(req,res) =>{
    res.render("cart.hbs");
});

app.get("/Dashboard",(req,res) =>{
    res.render("Dashboard.hbs");
});


app.listen(port,()=>{
    console.log(`app is listening on ${port}`);
});