'use strict';
/* 
  Import modules/files you may need to correctly run the script. 
  Make sure to save your DB's uri in the config file, then import it with a require statement!
 */
var fs = require('fs'),
    mongoose = require('mongoose'), 
    Schema = mongoose.Schema, 
    Listing = require('./ListingSchema.js'), 
    config = require('./config'),
	
	data = require('./listings.json');
	
/* Connect to your database */
mongoose.connect(config.db.uri);	//establish connection
var db = mongoose.connection;		//create var that looks at current connection
db.on('error', console.error.bind(console, 'connection error:'));	//check that we are,in fact, connected
db.once('open', function () {
    console.log("Connected correctly to server");	//Connected!
});

/* 
  Instantiate a mongoose model for each listing object in the JSON file, 
  and then save it to your Mongo database 
 */
 
 /*	My attempt to add each building into a model and then load that model into the db
 Listing.find().remove();	//clear all existing documents
 for( var i = 0; i < data.entries.length; i++ ) {
	 if(data.entries[i].coordinates == undefined) {
		var temp = new Listing({ name:data.entries[i].name, code:data.entries[i].code});
		db.listings.save(temp);
		console.log(temp.name);
	 } else {
		var temp = new Listing({ name:data.entries[i].name, code:data.entries[i].code, coordinates:{
			latitude:data.entries[i].coordinates.latitude, longitude:data.entries[i].coordinates.longitude}
			, address:data.entries[i].address });
		db.listings.save(temp);
	}
 }
 */
 
db.collection('listings').insert(data, function(err,r) {
	if(err) throw err;
	db.close();
});
/*
  Once you've written + run the script, check out your MongoLab database to ensure that 
  it saved everything correctly. 
 */