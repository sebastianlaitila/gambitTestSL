var ngapp = angular.module('gambitfront', ['ngMaterial', 'ngRoute']);

ngapp.config(function($routeProvider, $mdThemingProvider){
  $mdThemingProvider.theme('default')
    .primaryPalette('indigo')
    .accentPalette('grey');
});


ngapp.component('registerContent', {
  templateUrl: '/app/views/dl.html',
  controller: function($scope, getData){

      $scope.data = [];
      getData.values().then(function (res){
        $scope.data = res;
      });
  }
}
)

ngapp.service('getData', function ($http){
this.values = function(){
return  $http.get('/api/registers?startIndex=1&count=11')
  .success(function (data)
{
  return data;
})
.error(function(e)
{return null;
})
}
})
