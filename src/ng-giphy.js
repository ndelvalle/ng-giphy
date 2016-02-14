(function () {
  'use strict';

  angular.module('ng-giphy', [])
    .directive('giphyRand', giphyRand)
    .directive('giphyGif', giphyGif)
    .factory('giphy', giphyService);

  /**
   * Directive: random gif
   */
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


  /**
   * Directive: Specific gif by id
   */
  function giphyGif() {
    return {
      scope: {
        id    : '=',
        rating: '='
      },
      controller: giphyGifController,
      controllerAs: 'vm',
      bindToController: true,
      template: '<img ng-src="{{ vm.giphysrc }}">'
    };
  }

  giphyGifController.$inject = ['giphy'];
  function giphyGifController(giphy) {
    var vm = this;

    var id = vm.id || 'YyKPbc5OOTSQE';
    giphy.random(id).then(function (res) {
      vm.giphysrc = res;
    });
  }

  /**
   * Services to interact with the giphy API endpoints
   */
  giphyService.$inject = ['$http'];
  function giphyService($http) {
    var searchUrl = 'http://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC';
    var byIdUrl = 'http://api.giphy.com/v1/gifs/%s?api_key=dc6zaTOxFJmzC'

    return {
      random: random,
      byId: byId
    };

    /**
     * Gets a random gif url
     * 
     * @param {string} query
     * @return {string} gif url
     */
    function random(q){
      var words = q.split(' ');
      q = words.join('+')
      return $http.get(searchUrl + '&q=' + q).then(function (res) {
        return res.data.data[0].images.original.url;
      });
    }
    
   /**
    * Returns a giphy url by query its ID.
    *
    * @param {string} gif id
    * @return {string} gif url
    */
    function byId(id){
      return $http.get( byIdUrl.replace('%s', id) ).then(function (res) {
        console.log(res.data);
        return res.data.url;
      });
    }
  }

})();
