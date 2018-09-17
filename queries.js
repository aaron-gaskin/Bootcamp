/* Fill out these functions using Mongoose queries
var config = require('./config');
mongoose.connect(config.db.uri);	//establish connection
var db = mongoose.connection;		//create var that looks at current connection
db.on('error', console.error.bind(console, 'connection error:'));	//check that we are,in fact, connected
db.once('open', function () {
    console.log("Connected correctly to server");	//Connected!
});
*/
var MongoClient = require('mongodb').MongoClient
  , assert = require('assert'),
  config = require('./config');

var uri = config.db.uri;
MongoClient.connect(uri, function(err, db) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  db.close();
});


var findLibraryWest = function() {
  /* 
    Find the document that contains data corresponding to Library West,
    then log it to the console. 
   */
   
   
};
var removeCable = function() {
  /*
    Find the document with the code 'CABL'. This cooresponds with courses that can only be viewed 
    on cable TV. Since we live in the 21st century and most courses are now web based, go ahead
    and remove this listing from your database and log the document to the console. 
   */
   
   
};
var updatePhelpsLab = function() {
  /*
    Phelps Laboratory's address is incorrect. Find the listing, update it, and then 
    log the updated document to the console. 
   */
   
   
};
var retrieveAllListings = function() {
  /* 
    Retrieve all listings in the database, and log them to the console. 
   */
   
   
};

findLibraryWest();
removeCable();
updatePhelpsLab();
retrieveAllListings();
