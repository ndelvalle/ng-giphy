(function () {
  'use strict';

  angular.module('ng-giphy', [])
    .directive('giphySearch', giphySearch)
    .directive('giphyGif', giphyGif)
    .directive('giphyRand', giphyRand)
    .factory('giphy', giphyService)
    .provider('giphyApiKey', GiphyApiKey)
    .config(setKey);
    
  /**
   * Configure the provider to use the beta key
   */
  setKey.$inject = ['giphyApiKeyProvider'];
  function setKey(giphyApiKeyProvider) {
    giphyApiKeyProvider.setKey('dc6zaTOxFJmzC');
  }
  
  /**
   * Directive: search gif
   */
  function giphySearch() {
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
    giphy.search(q).then(function (res) {
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
    giphy.byId(id).then(function (res) {
      vm.giphysrc = res;
    });
  }
  
  /**
   * Directive: Random gif by tags
   */
  function giphyRand() {
    return {
      scope: {
        q     : '=',
        rating: '='
      },
      controller: giphyRandController,
      controllerAs: 'vm',
      bindToController: true,
      template: '<img ng-src="{{ vm.giphysrc }}">'
    };
  }

  giphyRandController.$inject = ['giphy'];
  function giphyRandController(giphy) {
    var vm = this;

    var q = vm.q || 'YyKPbc5OOTSQE';
    giphy.random(q).then(function (res) {
      vm.giphysrc = res;
    });
  }

  /**
   * Services to interact with the giphy API endpoints
   */
  giphyService.$inject = ['$http', 'giphyApiKey'];
  function giphyService($http, giphyApiKey) {
    var url ={
      random: 'http://api.giphy.com/v1/gifs/random?api_key=' + giphyApiKey.key,
      search: 'http://api.giphy.com/v1/gifs/search?api_key=' + giphyApiKey.key,
      byId: 'http://api.giphy.com/v1/gifs/%s?api_key=' + giphyApiKey.key
    };

    /**
     * Expose the service API
     */
    return {
      search: search,
      random: random,
      byId: byId
    };

    /**
     * Gets a search gif url
     * 
     * @param {string} query
     * @return {string} gif url
     */
    function search(q){
      var words = q.split(' ');
      q = words.join('+')
      return $http.get(url.search + '&q=' + q).then(function (res) {
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
      return $http.get( url.byId.replace('%s', id) ).then(function (res) {
        return res.data.data.images.original.url;
      });
    }
    
    /**
     * Gets a random gif url by tags
     * 
     * @param {string} query
     * @return {string} gif url
     */
    function random(q){
      var words = q.split(' ');
      q = words.join('+')
      return $http.get(url.random + '&tag=' + q).then(function (res) {
        return res.data.data.image_url;
      });
    }
  }
  
  /**
   * Giphy API key provider
   */
  function GiphyApiKey() {
    var key = 'dc6zaTOxFJmzC';
  
    return {
      setKey: function(value) {
        key = value;
      },
    
      $get: function () {
        return { key: key };
      }
    }
  }

})();
