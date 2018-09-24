
/* Dependencies */
var mongoose = require('mongoose'), 
    Listing = require('../models/listings.server.model.js'),
	MongoClient = require('mongodb').MongoClient,
	config = require('../config/config');

	mongoose.Promise = global.Promise;
/*
  In this file, you should use Mongoose queries in order to retrieve/add/remove/update listings.
  On an error you should send a 404 status code, as well as the error message. 
  On success (aka no error), you should send the listing(s) as JSON in the response.

  HINT: if you are struggling with implementing these functions, refer back to this tutorial 
  from assignment 3 https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications
 */

/************************ Create a listing *******************************/
exports.create = function(req, res) {

  /* Instantiate a Listing */
  var listing = new Listing(req.body);

  /* Then save the listing */
  // listing.save(function(err) {
    // if(err) {
      // console.log(err);
      // res.status(400).send(err);
    // } else {
      // res.json(listing);
    // }
  // });
  
  MongoClient.connect(config.db.uri, function(err, db) {		//connect to mlab
		if (err) throw err;
		// insert a new listing
		db.collection('listings').insertOne(listing, function(err, result) {
			if(err) {
			  console.log(err);
			  res.status(404).send(err);	//output 404 code if error
			} else{
				res.json(listing);	//return listing
			}
			db.close();
		});
	});
};

/************** Show the current listing **********************/
exports.read = function(req, res) {
  /* send back the listing as json from the request */
  res.json(req.listing);
};

/******************* Update a listing ***************************/
exports.update = function(req, res) {
  var listing = req.listing;
  

  /** TODO **/
  /* Replace the article's properties with the new properties found in req.body */
  /* Save the article */
  var newList = new Listing(req.body);	//create new listing
  console.log(req.body);
  //check if coordinates need to be updated
  if(req.body.coordinates == undefined) {
	var update = {$set:{code:newList.code, name:newList.name, address:newList.address} };	//set new values
  } else {
	  var update = {$set:{code:newList.code, name:newList.name, address:newList.address,
	  coordinates:{latitude:newList.coordinates.latitude, longitude:newList.coordinates.longitude} }};	//set new values
  }
  
  MongoClient.connect(config.db.uri, function(err, db) {		//connect to mlab
		if (err) throw err;
		// find and update the listing
		var query = {code: listing.code };
		db.collection('listings').updateOne(query,update, function(err, result) {
			if(err) {
			  console.log(err);
			  res.status(404).send(err);	//output 404 code if error
			} else{
				res.json(newList);		//return new listing
			}
			db.close();
		});
	});
};

/****************************** Delete a listing ***********************************/
exports.delete = function(req, res) {
  var listing = req.listing;
  console.log(listing);

  /** TODO **/
  /* Remove the article */
  
  MongoClient.connect(config.db.uri, function(err, db) {		//connect to mlab
		if(err) throw err;
		//find and delete the listing
		var query = {code: listing.code };
		db.collection('listings').deleteOne( query, function(err, result) {
			if(err) {
			  console.log(err);
			  res.status(404).send(err);	//output 404 code if error
			} else{
				res.json();
			}
			db.close();
		});
	});
  
};

/*********** Retreive all the directory listings, sorted alphabetically by listing code ***************/
exports.list = function(req, res) {
  /** TODO **/
  /* Your code here */
  
  MongoClient.connect(config.db.uri, function(err, db) {		//connect to mlab
		if(err) throw err;
		var mySort = {code: 1 };
		db.collection('listings').find().sort(mySort).toArray( function(err, listing) {
			if(err) {
			  console.log(err);
			  res.status(404).send(err);	//output 404 code if error
			} else {
			  res.json(listing);		//return listings if all good
			}
			db.close();
		});
	});
  
};

/* 
  Middleware: find a listing by its ID, then pass it to the next request handler. 

  Find the listing using a mongoose query, 
        bind it to the request object as the property 'listing', 
        then finally call next
 */
exports.listingByID = function(req, res, next, id) {
  Listing.findById(id).exec(function(err, listing) {
    if(err) {
      res.status(400).send(err);
    } else {
      req.listing = listing;
      next();
    }
  });
};