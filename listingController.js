angular.module('listings').controller('ListingsController', ['$scope', 'Listings', 
  function($scope, Listings) {
    $scope.listings = Listings;
    $scope.detailedInfo = undefined;

    /* 
      Implement these functions in the controller to make your application function 
      as described in the assignment spec. 
     */
	 
	//add a new listing to the end of Listings
   $scope.addListing = function() {
		//create new entry
		var newEntry = {'code': $scope.code, 'name': $scope.name,
		'coordinates': { 'latitude': $scope.lat, 'longitude':
		$scope.longitude}, 'address': $scope.address}
		
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
				$scope.lat = ''
				$scope.longitude = ''
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
			$scope.lat = ''
			$scope.longitude = ''
			$scope.address = ''
		}
	};
	
	//remove a specific listing based on index location
    $scope.deleteListing = function(index) {
		$scope.listings.splice(index,1);
	};
	
	//defines detailedInfo to the value of a specific listing based on index
    $scope.showDetails = function(index) {
		$scope.detailedInfo = Listings[index];
	};
  }
]);