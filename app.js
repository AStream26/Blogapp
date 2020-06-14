var express = require("express"),
	app= express(),
	bodyparser = require("body-parser"),
	mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/blogapp', {useNewUrlParser: true, useUnifiedTopology: true});

app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended: true}));

var blogschema = new mongoose.Schema({
	title:String,
	image:String,
	body:String,
	created:{type:Date,default:Date.now}
});
var blog = mongoose.model("blog",blogschema);


app.get("/blog",function(req,res){
	blog.find({},function(err,blogs){
		if(err){
			console.log("somethging went wrong!!");}
			else{
				res.render("index.ejs",{blogs:blogs});
			}
		});
	
});




app.listen(3000,function(){
	console.log("server started");
});