var express = require('express')
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//mongoose.connect('mongodb://localhost/lol_db');


const ObjectId = Schema.ObjectId;
 
const user_data = new Schema({
	
		search: { type: String, default: 'null' },
		site: { type: String, default: 'null' },
		time_and_data: { type: String, default: "null"},
		ip : {type: String, default: "0.0.0.0"} ,
		failed: {type: Boolean, default: false}
		
	
});

//turing schema into model
var initial_user_data = mongoose.model('people', user_data);

//importing that module 
module.exports = initial_user_data;
