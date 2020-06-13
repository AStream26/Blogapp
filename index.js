var express = require("express"),
	app= express(),
	bodyparser = require("body-parser"),
	mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});

app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended: true}));






app.listen(3000,function(){
	console.log("server started");
});