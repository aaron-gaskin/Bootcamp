/* Fill out these functions using Mongoose queries*/

//declare necessary modules, scriptsm, and files needed
var fs = require('fs'),
  mongoose = require('mongoose'),
  MongoClient = require('mongodb').MongoClient,
  config = require('./config');



var findLibraryWest = function() {
  /* 
    Find the document that contains data corresponding to Library West,
    then log it to the console. 
   */
	MongoClient.connect(config.db.uri, function(err, db) {
		if (err) throw err;
		var query = {name: 'Library West'};
		db.collection('listings').find(query).toArray( function(err, result) {
			if (err) throw err;
			console.log(result);
			db.close();
		});
	});
	   
};
var removeCable = function() {
  /*
    Find the document with the code 'CABL'. This cooresponds with courses that can only be viewed 
    on cable TV. Since we live in the 21st century and most courses are now web based, go ahead
    and remove this listing from your database and log the document to the console. 
   */
   MongoClient.connect(config.db.uri, function(err, db) {
		if (err) throw err;
		var query = {code: 'CABL'};
		//find and display data for 'CABL'
		db.collection('listings').find(query).toArray( function(err, result) {
			if (err) throw err;
			console.log(result);
			db.close();
		});
		//find and delete the listing for 'CABL'
		db.collection('listings').deleteOne(query, function(err, result) {
			if (err) throw err;
			db.close();
		});
	});
   
};
var updatePhelpsLab = function() {
  /*
    Phelps Laboratory's address is incorrect. Find the listing, update it, and then 
    log the updated document to the console. 
   */
   MongoClient.connect(config.db.uri, function(err, db) {
		if (err) throw err;
		var query = {name: 'Phelps Laboratory'};
		var newAddress = {$set: {address: '1953 Museum Rd, Gainesville, FL 32603'}};
		//find and uypdate the listing for 'Phelps Laboratory'
		db.collection('listings').updateOne(query,newAddress, function(err, result) {
			if (err) throw err;
			db.close();
		});
		//find and display data for 'Phelps Laboratory'
		db.collection('listings').find(query).toArray( function(err, result) {
			if (err) throw err;
			console.log(result);
			db.close();
		});
	});
   
};
var retrieveAllListings = function() {
  /* 
    Retrieve all listings in the database, and log them to the console. 
   */
   MongoClient.connect(config.db.uri, function(err, db) {
		if (err) throw err;
		db.collection('listings').find({}).toArray( function(err, result) {
			if (err) throw err;
			console.log(result);
			db.close();
		});
	});
   
};

findLibraryWest();
removeCable();
updatePhelpsLab();
retrieveAllListings();
