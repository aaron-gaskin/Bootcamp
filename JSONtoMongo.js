'use strict';
/* 
  Import modules/files you may need to correctly run the script. 
  Make sure to save your DB's uri in the config file, then import it with a require statement!
 */
var fs = require('fs'),
    mongoose = require('mongoose'), 
    Schema = mongoose.Schema, 
	MongoClient = require('mongodb').MongoClient,
    Listing = require('./ListingSchema.js'), 
    config = require('./config'),
	
	data = require('./listings.json');
	mongoose.Promise = global.Promise;
	
/* 
  Instantiate a mongoose model for each listing object in the JSON file, 
  and then save it to your Mongo database 
 */
 
 var result = [];
 /*	My attempt to add each building into a model and then load that model into the db*/
 Listing.find().remove();	//clear all existing documents
 for( var i = 0; i < data.entries.length; i++ ) {
	 if(data.entries[i].coordinates == undefined) {
		var temp = new Listing({ code:data.entries[i].code, name:data.entries[i].name });
		result.push(temp);
	 } else {
		var temp = new Listing({ code:data.entries[i].code, name:data.entries[i].name, coordinates:{
			latitude:data.entries[i].coordinates.latitude, longitude:data.entries[i].coordinates.longitude}
			, address:data.entries[i].address });
		result.push(temp);
	}
 }
 
 /* Connect to the database and add the array of building data to the database */
 MongoClient.connect(config.db.uri, function(err, db) {
	if (err) throw err;
	db.collection('listings').insert(result, function(err,r) {
		if(err) throw err;
		db.close();
	});
 });
/*
  Once you've written + run the script, check out your MongoLab database to ensure that 
  it saved everything correctly. 
 */