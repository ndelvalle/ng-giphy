(function () {
  'use strict';

  angular.module('ng-giphy', [])

    .directive('giphyFind',  findGiphy)
    .directive('giphyId',    findGiphyById)
    .directive('giphyRand',  findRandGiphy)

    .factory('giphy',        giphyService)
    .provider('giphyConfig', giphyConfig)

    .config(ngGiphyConfig)
    .run(templateCache);

  // configure the provider to use the beta key
  ngGiphyConfig.$inject = ['giphyConfigProvider'];
  /* @ngInject */
  function ngGiphyConfig(giphyConfigProvider) {
    giphyConfigProvider.setKey('dc6zaTOxFJmzC');
  }

  /**
   * Directive: find gif by tag
   */
  function findGiphy() {
    return {
      scope: {
        q     : '=giphyQ',
        rating: '='
      },
      controller: findGiphyController,
      controllerAs: 'vm',
      bindToController: true,
      templateUrl: 'imgTemplate.html'
    };
  }

  findGiphyController.$inject = ['giphy'];
  /* @ngInject */
  function findGiphyController(giphy) {
    /* jshint validthis: true */
    var vm = this;

    giphy.find(vm.q).then(function (res) {
      vm.giphysrc = res;
    });
  }


  /**
   * Directive: find gif by id
   */
  function findGiphyById() {
    return {
      scope: {
        id    : '=giphyId',
        rating: '='
      },
      controller: findGiphyByIdController,
      controllerAs: 'vm',
      bindToController: true,
      templateUrl: 'imgTemplate.html'
    };
  }

  findGiphyByIdController.$inject = ['giphy'];
  /* @ngInject */
  function findGiphyByIdController(giphy) {
    /* jshint validthis: true */
    var vm = this;

    giphy.findById(vm.id).then(function (res) {
      vm.giphysrc = res;
    });
  }

  /**
   * Directive: find random gif by tag
   */
  function findRandGiphy() {
    return {
      scope: {
        q     : '=giphyQ',
        rating: '='
      },
      controller: findRandGiphyController,
      controllerAs: 'vm',
      bindToController: true,
      templateUrl: 'imgTemplate.html'
    };
  }

  findRandGiphyController.$inject = ['giphy'];
  /* @ngInject */
  function findRandGiphyController(giphy) {
    /* jshint validthis: true */
    var vm = this;

    giphy.random(vm.q).then(function (res) {
      vm.giphysrc = res;
    });
  }


  // services to interact with Giphy API endpoints
  giphyService.$inject = ['$http', 'giphyConfig'];
  /* @ngInject */
  function giphyService($http, giphyConfig) {

    var baseUrl = 'http://api.giphy.com/v1/gifs';

    var url = {
      random   : baseUrl + '/random?api_key=' + giphyConfig.key,
      find     : baseUrl + '/search?api_key=' + giphyConfig.key,
      findById : baseUrl + '/%s?api_key='     + giphyConfig.key
    };

    // expose the service API
    return {
      find     : find,
      findById : findById,
      random   : random
    };

    /**
     * Gets a gif url searching by tag
     *
     * @param {string} query
     * @return {string} gif url
     */
    function find(q){
      var query = q.constructor === Array ? q.join('+') : q;

      return $http.get(url.find + '&q=' + query).then(function (res) {
        return res.data.data[0].images.original.url;
      });
    }

   /**
    * Gets a gif url searching by id
    *
    * @param {string} gif id
    * @return {string} gif url
    */
    function findById(id){
      return $http.get(url.findById.replace('%s', id)).then(function (res) {
        return res.data.data.images.original.url;
      });
    }

    /**
     * Gets a random gif url searching by tag
     *
     * @param {string} query
     * @return {string} gif url
     */
    function random(q){
      var query = q.constructor === Array ? q.join('+') : q;
      return $http.get(url.random + '&tag=' + query).then(function (res) {
        return res.data.data.image_url;
      });
    }
  }


  templateCache.$inject = ['$templateCache'];
  /* @ngInject */
  function templateCache($templateCache) {
    $templateCache.put('imgTemplate.html', '<img ng-src="{{ vm.giphysrc }}">');
  }

  // giphy API key provider
  function giphyConfig() {
    /* jshint validthis: true */
    this.setKey = function(value) {
      this.key = value;
    };

    this.$get = function() {
      return this;
    };
  }

})();
