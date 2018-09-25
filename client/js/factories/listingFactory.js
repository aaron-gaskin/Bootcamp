angular.module('listings', []).factory('Listings', function($http) {
  var methods = {
    getAll: function() {
      return $http.get('https://peaceful-retreat-49403.herokuapp.com/api/listings');
    },
	
	create: function(listing) {
	  return $http.post('https://peaceful-retreat-49403.herokuapp.com/api/listings', listing);
    }, 

    delete: function(id) {
	   /**TODO
        return result of HTTP delete method
       */
		return $http.delete('https://peaceful-retreat-49403.herokuapp.com/api/listings/'+id);
    }
  };

  return methods;
});
