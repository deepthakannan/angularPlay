angular.module('playDirectives')
.controller('playHardWithDirectives', ['$scope', function($scope) {
  $scope.customer = {
    name: 'Leonard',
    address: 'Boston',
    age: -6
  };
  
  $scope.update = function(name, age){
    $scope.customer.name = name;
    $scope.customer.age = age;
  };
  $scope.start = 19;
  $scope.delay = 50000;
}]).directive('solarSystem', function() {
  return {
    restrict: 'EA',
    transclude: true,
    scope: {
      'updateCustomer': '&onUpdate'
    },
    controller: function($scope){
      $scope.planets = [];
      this.addPlanet =  function(planet)
      {
        $scope.planets.push(planet);
      }
      $scope.highlight = function(planet){
        angular.forEach($scope.planets, function(planet) {
          planet.selected = false;
        });
        planet.selected = true;
      }
      console.log($scope);
    },
    templateUrl: "view/solarSystem.html"
  }}).directive('planet', function($interval) {
  return {
    restrict: 'EA',
    require: "^solarSystem",
    transclude: true,
    scope: {
      name: '@'
    },
    link: function(scope, element, attrs, solarSystem){
      solarSystem.addPlanet(scope);
    },
    controller: function($scope){
      $scope.update =  function()
      {
        $scope.updateCustomer({custName:$scope.name, custAge:$scope.age});
      }
      console.log($scope);
    },
    templateUrl: "view/planet.html"
  }});