var ngapp = angular.module('gambitfront', ['ngMaterial', 'ngRoute']);

ngapp.config(function($routeProvider, $mdThemingProvider){
  $mdThemingProvider.theme('default')
    .primaryPalette('deep-purple')
    .accentPalette('yellow');
});


ngapp.component('registerContent', {
  templateUrl: '/app/views/dl.html',
  controller: function($scope, getData){
      $scope.searchVisible=false;
      $scope.listVisible=true;
      $scope.listIndex=1;
      $scope.List = [];
      $scope.search = "";
      $scope.searchResults = [];

      getList();


      $scope.previous = function(){
        if($scope.listIndex-6 <1 ){
            $scope.listIndex = 1;
          }
          else {
            $scope.listIndex-=6;
          }
          getList();
      }

      $scope.next = function(){
        if($scope.listIndex+6 >95 ){
            $scope.listIndex = 95;
          }
          else {
            $scope.listIndex+=6;
          }
          getList();
      }

      function getList(){ getData.list($scope.listIndex, 6)
      .then(function(res){
        console.log(res.data);
        $scope.List= res.data;
      })
      }

      $scope.activeObject = [];
      $scope.cancelSearch = function(){
        $scope.searchResults = [];
        $scope.search = "";
        $scope.searchVisible = false;
      }

      $scope.find = function(search){

        if(search.length>2)
          getData.search(search).then(function(res){
            $scope.searchResults=res.data;
          })
          else {
            $scope.searchResults=[]
          }
      }
      $scope.getTime = function(timeString) {
        var d = new Date(timeString);
        return d.toLocaleDateString('fi-FI') + " " + d.toLocaleTimeString('fi-FI')
      }

      $scope.setActive = function(collection, value){
          $scope.listVisible=false;
          $scope.activeObject = [];
          $scope.searchVisible=false;
          $scope.find("");

        collection.forEach(function (item){
          if (item.Name == value){
              $scope.activeObject.push(item);
            }
        });
              $scope.listIndex = $scope.activeObject[0].Register;
              getList();
      }

  }
}
)

ngapp.service('getData', function ($http){
this.list = function(start, count){
return  $http.get('/api/registers?startIndex='+start+'&count='+count)
  .success(function (data)
{
  return data;
})
  .error(function(e)
  {return null;
  })
}
this.search = function(query){
return  $http.get('/api/search/'+query)
  .success(function (data)
{
  return data;
})
  .error(function(e)
  {return null;
  })
}


})
