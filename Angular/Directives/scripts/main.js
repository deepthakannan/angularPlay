angular.module('playDirectives', [])
.controller('playDirectives', ['$scope', function($scope) {
  $scope.customer = {
    name: 'Sheldon',
    address: 'Boston',
    age: -67
  };
  
  $scope.update = function(name, age){
    $scope.customer.name = name;
    $scope.customer.age = age;
  };
  $scope.start = 19;
  $scope.delay = 50000;
}])
.directive('myCustomer', function() {
  return {
    template: 'Name: {{customer.name}} Address: {{customer.address}} Age: {{customer.age}}'
  };
})
.directive('myCustomerTemplateUrl', function() {
  return {
    restrict: 'EA',
    templateUrl: function(element, attributes){
      return "view/customer.html";
    }
  };
}).directive('myCustomerInfo', function() {
  return {
    restrict: 'EA',
    scope: {
      customer: "=data"
    },
    templateUrl: function(element, attributes){
      return "view/customer.html";
    },
    controller: function($scope){
      console.log($scope);
    }
  }
}).directive('counter', function($interval) {
  return {
    restrict: 'EA',
    scope: {
      start: "=",
      delay: "="
    },
    controller: function($scope){
      console.log($scope);
    },
    transclude: true,
    template: "<h2><div ng-transclude></div></h2>",
    link: function(scope, element, attrs, controller, transcludeFn){
      var delay = scope.delay;
      var count = scope.start;
      var interval;
      
      function updateCount(){
        element.text(count++);
      }
      
      scope.$watch(attrs.delay, function(value) {
        delay = value;
        destroyAndCreateInterval();
      });
      
      scope.$watch("start", function(value) {
        count = value;
      });
    
      function destroyAndCreateInterval(){
        if(interval)
        {
          $interval.cancel(interval);
        }
        interval = $interval(function(){
          updateCount();
        }, delay)
      }  
      
      element.on('$destroy', function() {
      $interval.cancel(interval);
    });
    }
  }}).directive('inPageDialog', function($interval) {
  return {
    restrict: 'EA',
    scope: {
      'updateCustomer': '&onUpdate'
    },
    controller: function($scope){
      $scope.update =  function()
      {
        $scope.updateCustomer({custName:$scope.name, custAge:$scope.age});
      }
      console.log($scope);
    },
    templateUrl: "view/customerUpdate.html"
  }});