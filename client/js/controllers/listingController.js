angular.module('listings').controller('ListingsController', ['$scope', 'Listings', 
  function($scope, Listings) {
    /* Get all the listings, then bind it to the scope */
    Listings.getAll().then(function(response) {
      $scope.listings = response.data;
	  console.log($scope.listings);
    }, function(error) {
      console.log('Unable to retrieve listings:', error);
    });

    $scope.detailedInfo = undefined;

    $scope.addListing = function() {
	  /********************TODO 
	  *Save the article using the Listings factory. If the object is successfully 
	  saved redirect back to the list page. Otherwise, display the error
	 */
	 
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
			Listings.create(newEntry).then(function(res) { //add new entry
				///reload page here ////
				location.reload();
			}, function(error) {
			  console.log('Unable to retrieve listings:', error);
			});
			
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
		//add new entry to db and redirect back to list page
		Listings.create(newEntry).then(function(res) {  //add new entry
			///reload page here ////
			location.reload();
		}, function(error) {
		  console.log('Unable to add listing: ', error);
		});
		
		//reset values
		$scope.code = ''
		$scope.name = ''
		$scope.address = ''
	}
    };

    $scope.deleteListing = function(index) {
	   /************************TODO
        Delete the article using the Listings factory. If the removal is successful, 
		navigate back to 'listing.list'. Otherwise, display the error. 
       */
	   //delete entry from db and redirect back to list page
		var remove = $scope.listings[index]._id;
		Listings.delete(remove).then(function(res){
			//// reload page here ///
			location.reload();
		}, function(error) {
		  console.log('Unable to delete listing: ', error);
		});
	   
    };

    $scope.showDetails = function(index) {
      $scope.detailedInfo = $scope.listings[index];
    };
  }
]);