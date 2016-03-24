(function () {
  'use strict';

  angular.module('ng-giphy')
    .factory('giphy', giphyService);

  // services to interact with Giphy API endpoints
  giphyService.$inject = ['$http', 'giphyConfig'];
  /* @ngInject */
  function giphyService($http, giphyConfig) {

    var baseUrl = 'http://api.giphy.com/v1/gifs';

    var url = {
      random   : baseUrl + '/random?api_key='   + giphyConfig.key,
      find     : baseUrl + '/search?api_key='   + giphyConfig.key,
      findById : baseUrl + '/%s?api_key='       + giphyConfig.key,
      trending : baseUrl + '/trending?api_key=' + giphyConfig.key,
    };

    // expose the service API
    return {
      find        : find,
      findById    : findById,
      random      : random,
      trending    : trending
    };

    /**
     * Gets a gif url searching by tag
     *
     * @param {string} query
     * @param {Boolean} returnUrl
     * @return {string} gif url
     */
    function find(q, returnUrl){
      var query = q.constructor === Array ? q.join('+') : q;
      return $http.get(url.find + '&q=' + query).then(function (res) {
        return returnUrl ? res.data.data[0].images.original.url : res.data.data[0];
      });
    }

   /**
    * Gets a gif url searching by id
    *
    * @param {string} gif id
    * @param {Boolean} returnUrl
    * @return {string} gif url
    */
    function findById(id, returnUrl){
      return $http.get(url.findById.replace('%s', id)).then(function (res) {
        return returnUrl ? res.data.data.images.original.url : res.data.data;
      });
    }

    /**
     * Gets a random gif url searching by tag
     *
     * @param {string} query
     * @param {Boolean} returnUrl
     * @return {string} gif url
     */
    function random(q, returnUrl){
      var query = q.constructor === Array ? q.join('+') : q;
      return $http.get(url.random + '&tag=' + query).then(function (res) {
        return returnUrl ? res.data.data.image_url : res.data.data;
      });
    }

    /**
     * Fetch GIFs currently trending online. Hand curated by the Giphy editorial team.
     * The data returned mirrors the GIFs showcased on the Giphy homepage. Returns 25 results by default.
     *
     * @param {Number} limit
     * @param {Boolean} rating
     * @return {string} gif url
     */
    function trending(limit, rating) {
      return $http.get(url.trending + '&limit=' + limit).then(function (res) {
        return res.data.data;
      });
    }
  }

})();
