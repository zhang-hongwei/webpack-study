let express = require("express");
let app = express();
let webpack = require("webpack");
let middle = require("webpack-dev-middleware");





app.get("/user",(req,res)=>{
    res.json({name:"zhang"})
}).listen(5005)