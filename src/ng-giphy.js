(function () {
  'use strict';

  angular.module('ng-giphy', [])
    .directive('giphyRand', giphyRand)
    .factory('giphy', giphyService);

  function giphyRand() {
    return {
      scope: {
        q     : '=',
        rating: '='
      },
      controller: giphyController,
      controllerAs: 'vm',
      bindToController: true,
      template: '<img ng-src="{{ vm.giphysrc }}">'
    };
  }

  giphyController.$inject = ['giphy'];
  function giphyController(giphy) {
    var vm = this;

    var q = vm.q || 'cat';
    giphy.random(q).then(function (res) {
      vm.giphysrc = res;
    });
  }


  giphyService.$inject = ['$http'];
  function giphyService($http) {
    var apiurl = 'http://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC';

    return {
      random: random
    };

    function random(q){
      return $http.get(apiurl + '&q=' + q).then(function (res) {
        console.log(res.data);
        return res.data.data[0].images.original.url;
      });
    }
  }

})();
