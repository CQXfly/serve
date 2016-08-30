var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cookieparser = require('cookie-parser');
var path = require('path');
var httpserve = require('http')

var app = express();
var user = require('./models/test').user

// app use

// var dburl = "mongodb://localhost:27017/qx"; //打开数据库

var dburl = "mongodb://120.27.93.13:27017/qx"
mongoose.connect(dburl,function(err,db){

	console.log("数据库打开成功 " + err + db)
});

app.set('views',path.join(__dirname,'Views'));
app.set('view engine','ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieparser());
app.use(express.static(path.join(__dirname,'public')));

app.get('/hi',function(req,res){

	var userid = req.query.userid;
	var password = req.query.password;

	var datas = [{'userid':userid,'password':password}];


	user.create(datas,function(err,docs){

		if (err) {
			console.log("dberr" + err)
		} else {
			console.log(docs)
		}

	});
	res.send("hello:hi")
})

app.get('/',function(req,res){


	console.log('successs' + req.body);

	res.send(["sda","sda",".asdad",1,2])
})

app.get('/token',(req,res)=>{

	
});

app.post("/hello",function(req,res,next){
	console.log(req.body)
	res.send("hello:hi")
})

app.get('/configure',(req,res,next)=>{

	var dic = {"version":"1.0","shouldcrash":"true"}
	res.send(dic)
})

httpserve.createServer(app).listen('8090',function(){
	console.log("successs");
});



//app.listen(3000,function(){
//	console.log("applisten")
//});



