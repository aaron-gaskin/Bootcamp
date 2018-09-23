angular.module('listings').controller('ListingsController', ['$scope', 'Listings', 
  function($scope, Listings) {
    /* Get all the listings, then bind it to the scope */
    Listings.getAll().then(function(response) {
      $scope.listings = response.data;
    }, function(error) {
      console.log('Unable to retrieve listings:', error);
    });

    $scope.detailedInfo = undefined;

    $scope.addListing = function() {
	  /**TODO 
	  *Save the article using the Listings factory. If the object is successfully 
	  saved redirect back to the list page. Otherwise, display the error
	 */
	 
	 //////Copied from Assignment2
	 //create new entry
	 var newEntry = {'code': $scope.code, 'name': $scope.name, 'address': $scope.address}
	 
	 //find alphabetical location via for loop
	var temp;
	var i;
	var check = false;
	for(i=0; i < $scope.listings.length; i++)
	{
		temp=$scope.listings[i];
		if(newEntry.code < temp.code)
		{
			console.log("spliced");
			$scope.listings.splice(i,0,newEntry);	//add new entry
			
			//reset values
			$scope.code = ''
			$scope.name = ''
			$scope.address = ''
			
			return;//end code
		}
	}
	//if you get out of the for loop, push it to the end
	if(!check)
	{
		$scope.listings.push(newEntry)	//add new entry
		
		//reset values
		$scope.code = ''
		$scope.name = ''
		$scope.address = ''
		}
	 
	 
    };

    $scope.deleteListing = function(index) {
	   /**TODO
        Delete the article using the Listings factory. If the removal is successful, 
		navigate back to 'listing.list'. Otherwise, display the error. 
       */
	   ////////Copied from Assignment2
	   $scope.listings.splice(index,1);
    };

    $scope.showDetails = function(index) {
      $scope.detailedInfo = $scope.listings[index];
    };
  }
]);