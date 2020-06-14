var express = require("express"),
	app= express(),
	methodoverride = require("method-override"),
	bodyparser = require("body-parser"),
	mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/blogapp', {useNewUrlParser: true, useUnifiedTopology: true});
 app.use(methodoverride("_method"));
app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended: true}));

var blogschema = new mongoose.Schema({
	title:String,
	introduction :String,
	image:String,
	body:String,
	created:{type:Date,default:Date.now},
	conclusion:String
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

app.get("/blog/new",function(req,res){
	res.render("new.ejs");
});

app.post("/blog",function(req,res){
	blog.create(req.body.blog,function(err,blogs){
		if(err){
			res.redirect("/blog/new");
		}
		else{
			res.redirect("/blog");
		}
	});
});
app.get("/blog/:id/edit",function(req,res){
	blog.findById(req.params.id,function(err,blog){
		if(err){
			res.redirect("/blog");
		}
		else{
			res.render("edit.ejs",{blog:blog});
		}
	});
});

app.get("/blog/:id",function(req,res){
	blog.findById(req.params.id,function(err,foundblog){
		if(err){
			res.redirect("/blog");
		}
		else{
			res.render("show.ejs",{blog:foundblog});
		}
	});
	
});

app.put("/blog/:id",function(req,res){
blog.findByIdAndUpdate(req.params.id,req.body.blog,function(err,editedblog){
	if(err){
	    res.redirect("/blog");
	}
	else{
	  res.redirect("/blog/"+req.params.id);
	}
});
 });

app.delete("/blog/:id",function(req,res){
	blog.findByIdAndRemove(req.params.id,function(err){
		if(err){
			res.redirect("/blog");
		}
		else{
			res.redirect("/blog");
		}
	});
	
});



app.listen(3000,function(){
	console.log("server started");
});