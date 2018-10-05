const mongoose = require("mongoose")
const keys = require("./config/keys")
var data_model = require("./Models/db_model");
const date = require('date-and-time');



class Database {
	constructor(ip,search,site,failed){
		let now = new Date();
    	this.time_and_data = date.format(now, 'YYYY/MM/DD HH:mm:ss', true );    // => '2015/01/02 23:14:05'  Time will be in UTC.
  		this.ip = ip 
  		this.search = search
  		this.site = site
  		this.failed = failed 
	} 

 	user() {
 		let now = new Date();
 		let user_data = {
 			
 				"ip": this.ip,
 				"search": this.search, 
 				"site": this.site, 
 				"time_and_data": this.time_and_data, 
 				"failed":this.failed
 			
 		}
 		console.log(user_data)

 		const instance = new data_model(user_data)
 		instance.save(function(err){
 			if (err){
 				console.log(err)

 				//Do something to complete the request, even if there is some error saving data in the db. 
 			}
 			else{
 				console.log("No error saving the data in db.")
 			}
 		})
	}
}



module.exports = Database;
