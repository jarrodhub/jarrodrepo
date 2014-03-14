'use strict';

angular.module('search', ['elasticsearch'])
 .service('es', function (esFactory) {
    return esFactory({
      host: 'http://localhost:8080/myapp'
    });
  })
  .controller('searchController', function ($window, $scope, es) {

      var userQuery = $scope.searchText;//request.param('search_query');


      $scope.search = function () {
        console.log( "searched for " + $scope.searchText );

     es.search({

           body: {
             query: {
               match: {
                 _all: $scope.searchText
               }
             }
           }
         }).then(function (resp) {
             $scope.results = resp.hits.hits;
             $scope.total = resp.hits.total;
             return $scope.results;
         }, function (err) {
             console.log(err);
         })

      };

  });




