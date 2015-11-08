angular.module('instaSpotApp')
  .controller('PlaceCtrl', ['$scope', '$http', 'MainFactory', '$location', '$window', function ($scope, $http, MainFactory, $location, $window) {
    var city = MainFactory.getCity().city;
    var country = MainFactory.getCity().country;
    var url = '/api/place';
    var currentMainIndex = 0;
    
    $scope.tourSpot = [];

    $scope.back = function(){
      $location.path('/m');
    };

    $scope.book = function(){
      $location.path('/b');
    };
    
    $scope.update = function(){
      var finalIndex = currentMainIndex + 5;
      for (var i = currentMainIndex; i < finalIndex && i < globalVariable.placeViewAllImages.length; i++){
        currentMainIndex++;
        $scope.tourSpot.push(globalVariable.placeViewAllImages[i])
      }
    }
    
    // $http.get(url, {params: {city: city, country: country}})
      // .then(function success(response){
        // globalVariable.placeViewAllImages = response.data;
        // $scope.update();
      // })
      
    for (var i = 0; i < globalVariable.mainViewAllImages.length; i++){
      if (globalVariable.mainViewAllImages[i].city === city && globalVariable.mainViewAllImages[i].country === country){
        globalVariable.placeViewAllImages.push(globalVariable.mainViewAllImages[i]);
      }
      globalVariable.placeViewAllImages = shuffle(globalVariable.placeViewAllImages);
    }
    
    $scope.location = MainFactory.getCity();

    
    //Handles the logic to infinitely scroll through the app
    angular.element($window).bind("scroll", function() {
    
      //Change as Necessary. Might not work on every browser
      var height = window.innerHeight,
        currentPosition = document.body.scrollTop,
        bottom = document.body.scrollHeight;
    
      //Once the scroll position reaches a certain point execute the infinite scroll
      if ((height + currentPosition) >= (bottom - (height / 4))) {
        $scope.$apply(function(){ $scope.update(); });
      }
    });
  }]);
  
function shuffle(o){
  for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
  return o;
}