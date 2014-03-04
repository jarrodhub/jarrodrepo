'use strict';

angular.module('search', ['elasticsearch'])


 .service('es', function (esFactory) {
    return esFactory({
      host: 'http://10.47.251.187:9200'
    });
  })
  .controller('searchController', function ($window, $scope, es) {
      var pageNum = 15//request.param('page', 0);
      var perPage = 15;//request.param('per_page', 15);
      var userQuery = $scope.searchText;//request.param('search_query');
      var userId = 1; //request.session.userId;

      $scope.search = function () {
        console.log( "searched for " + $scope.searchText );

     es.search({
           index: 'ats_index',
           type: 'episode',
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
     /*
        es.ping({
                     requestTimeout: 1000,
                     hello: "elasticsearch!"

                   }, function (error) {
                     if (error) {
                       console.error('elasticsearch cluster is down!');
                     } else {
                       console.log('All is well');
                     }
                   })

      */

    /*es.search({
                index: 'people_index',
                from: (pageNum - 1) * perPage,
                size: perPage,
                body: {
                    query: {
                              match: {
                                _all: 'Burton'
                              }
                            }

                }
              }, function (error, response) {

                    if (error) {
                      // handle error
                      return;
                    }

                    response.render('search_results', {
                      results: response.hits.hits,
                      page: pageNum,
                      pages: Math.ceil(response.hits.total / perPage)
                    });
             })
             */
  });




