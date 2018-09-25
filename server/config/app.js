var config = require('./config.js'), 
    mongoose = require('mongoose'),   
    express = require('./express.js');

module.exports.start = function() {
  var app = express.init();
  const PORT = process.env.PORT || 3000;
	app.listen(PORT, () => {
		console.log(`Our app is running on port ${ PORT }`);
	});
};