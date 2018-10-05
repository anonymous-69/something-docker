
"use strict"
// Boilerplate code for the express app. 
const express = require('express')
const bodyParser = require('body-parser')
const path = require("path")
const mongoose = require("mongoose")
const keys = require("./config/keys") //Contains db passwors and username. 
var data_model = require("./Models/db_model");
const date = require('date-and-time');
const axios = require('axios')
var rp = require('request-promise');

const app = express()



mongoose.connect('mongodb:27017/docker-node-mongo', 
	{ useNewUrlParser:true }) 
.then(() => console.log("connected to mongodb"))
.catch(err =>console.log(err))



app.use(bodyParser.json()); 




app.use(function( req,res,next){
    next()
    
});









// app.get('/api', function(req, res,next){
// 	console.log(req.body)
// 	let data = {
// 		"site_Name":{
// 			"name":"AAaghav", 
// 			"body":"the name is raghav"
// 		}
		
// 	}
// 	const instance = new data_model(data)
// 		instance.save(function (err) {
//     	if (err){
//     		console.log(err)
//     	}
//     	else{
//     		console.log("no error")
//     		res.send(instance)   		 
//     	}
    	
//     	//console logging all the db to the terminal. 
//     	/*person_model.find(function(err,docs){
//     		console.log("these are docs")
//     		console.log(docs)
//     	})*/
    	    	

//   	});

	
	
// })



// app.get('/proxy', function(req, res,next){
// 	console.log("hitting proxy")
// 	var url_paytm = "https://middleware.paytmmall.com/search?channel=web&child_site_id=6&site_id=2&version=2&userQuery=sneakers&from=organic&cat_tree=1&page_count=1&items_per_page=32&resolution=960x720&quality=high&curated=1&_type=1"
// 	//var url_paytm = "http://newsdailyexpress.com/"
// 	const headers = {
//         "Accept": "*/*",
//         "Accept-Language": "en-US,en;q=0.5",
//         "Content-Type": "application/json",
//         "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36",
//         "X-user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36 FKUA/website/41/website/Desktop",
//         "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
//         //"Referer": "https://paytmmall.com/",
//         "Connection": "keep-alive",
//         //"Host":"middleware.paytmmall.com",
//         //"Origin": "https://paytmmall.com"
//         }
//    	var response = axios({
//         method: 'get',
//         url: url_paytm,
//         //headers:headers,
//         proxy: { 
//     		host : '140.109.54.159',
//     		port : 	8080
//   		}
       
        
//       })
//     .then(function (response){
//     	console.log(response.data)


//     })
//     .catch(function(err){
//         console.log(err)
        
    

// 	})

    	
    	    	


	
	
// })




// app.get('/proxy1', function(req, res,next){
// 	console.log("hitting proxy")
// 	//var url_paytm = "https://middleware.paytmmall.com/search?channel=web&child_site_id=6&site_id=2&version=2&userQuery=sneakers&from=organic&cat_tree=1&page_count=1&items_per_page=32&resolution=960x720&quality=high&curated=1&_type=1"
// 	var url_paytm = "http://newsdailyexpress.com/"
// 	const headers = {
//         "Accept": "*/*",
//         "Accept-Language": "en-US,en;q=0.5",
//         "Content-Type": "application/json",
//         "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36",
//         "X-user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36 FKUA/website/41/website/Desktop",
//         "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
//         //"Referer": "https://paytmmall.com/",
//         "Connection": "keep-alive",
//         //"Host":"middleware.paytmmall.com",
//         //"Origin": "https://paytmmall.com"
//         }
// 	rp({
//   	url: 'https://middleware.paytmmall.com/search?channel=web&child_site_id=6&site_id=2&version=2&userQuery=sneakers&from=organic&cat_tree=1&page_count=1&items_per_page=32&resolution=960x720&quality=high&curated=1&_type=1',
//   	proxy: 'http://190.81.162.134:53281',
//   	headers:headers
// 	})
// 	.then(function(response){
// 		console.log(response)
// 	})
//     .catch(function (err) {
//         console.log(err)
//     });


// })









let amazon = require('./routes/amazon');
app.use('/', amazon);

let flipkart = require('./routes/flipkart');
app.use('/', flipkart);


let paytm = require('./routes/paytm');
app.use('/', paytm);


app.use(function( req,res,next){
	next()
	

});



const PORT = 3000;
const HOST = '0.0.0.0';

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);