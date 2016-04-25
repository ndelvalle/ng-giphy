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
      random   : baseUrl + '/random',
      find     : baseUrl + '/search',
      findById : baseUrl + '/%s',
      trending : baseUrl + '/trending',
    };

    var http = {
      get: function httpGet(url, data) {
        var params = data || {};
        params.api_key = giphyConfig.key;
        return $http.get(url, { params: params }).then(function (res) {
          return res.data.data;
        });
      }
    };

    // expose the service API
    return {
      find            : find,
      findUrl         : findUrl,
      findById        : findById,
      findUrlById     : findUrlById,
      findRandom      : findRandom,
      findRandomUrl   : findRandomUrl,
      findTrending    : findTrending,
      findTrendingUrl : findTrendingUrl
    };


    /**
     * Gets gifs searching by tags
     *
     * @param {String || Array<String>} tags
     * @param {Number} limit (optional) maximum 100. Default 25
     * @param {Number} offset (optional) defaults to 0
     * @return {Collection} gifs
     */
    function find(tags, limit, offset){
      return http.get(url.find, paramsMapper(tags, limit, offset))
      .then(function(response) {
        return responseMapper(response, false, limit);
      });
    }


    /**
     * Gets gifs url searching by tags
     *
     * @param {String || Array<String>} tags
     * @param {Number} limit (optional) maximum 100. Default 25
     * @param {Number} offset (optional) defaults to 0
     * @return {Collection} gifs
     */
    function findUrl(tags, limit, offset){
      return http.get(url.find, paramsMapper(tags, limit, offset))
      .then(function(response) {
        return responseMapper(response, true, limit);
      });
    }


   /**
    * Gets a gif searching by id
    *
    * @param {String} gif id
    * @return {String} gif
    */
    function findById(id){
      return http.get(url.findById.replace('%s', id));
    }


    /**
     * Gets a gif url searching by id
     *
     * @param {String} gif id
     * @return {String} gif url
     */
     function findUrlById(id){
       return http.get(url.findById.replace('%s', id))
       .then(function(response) {
         return responseMapper(response, true);
       });
     }


    /**
     * Gets random gif searching by tag
     *
     * @param {String || Array<String>} tags
     * @return {String} gif
     */
    function findRandom(tags){
      return http.get(url.random, paramsMapper(tags));
    }


    /**
     * Gets random gif searching by tag
     *
     * @param {String || Array<String>} tags
     * @return {String} gif url
     */
    function findRandomUrl(tags){
      return http.get(url.random, paramsMapper(tags))
      .then(function(response) {
        return response.image_url;
      });
    }


    /**
     * Fetch GIFs currently trending online. Hand curated by the Giphy editorial team.
     * The data returned mirrors the GIFs showcased on the Giphy homepage.
     *
     * @param {Number} limit (optional) maximum 100. Default 25
     * @param {Number} offset (optional) defaults to 0
     * @return {Collection} gifs
     */
    function findTrending(limit, offset) {
      return http.get(url.trending, paramsMapper(undefined, limit, offset))
      .then(function(response) {
        return responseMapper(response, false);
      });
    }


    /**
     * Fetch GIFs currently trending online. Hand curated by the Giphy editorial team.
     * The data returned mirrors the GIFs showcased on the Giphy homepage.
     *
     * @param {Number} limit (optional) maximum 100. Default 25
     * @param {Number} offset (optional) defaults to 0
     * @return {Collection} gifs url
     */
    function findTrendingUrl(limit, offset) {
      return http.get(url.trending, paramsMapper(undefined, limit, offset))
      .then(function(response) {
        return responseMapper(response, true);
      });
    }

    /**
     * Map the response
     *
     * @param {Collection} response
     * @param {Boolean} returnUrl, weather should return a gif or a gif url
     * @return {Collection} mapped response
     */
    function responseMapper(response, returnUrl) {
      if (!returnUrl) return response;
      var isArray = response.constructor === Array;
      if (!isArray) return response.images.original.url;
      return response.map(function(item) {
        return item.images.original.url;
      });
    }


    /**
     * Map http get params
     *
     * @param {String || Array<String>} tags
     * @param {Number} limit
     * @param {Number} offset
     * @returns {Object} params ready to use in http get request
     */
    function paramsMapper(tags, limit, offset) {
      var params = {};
      if (tags) params.q = tags.constructor === Array ? tags.join('+') : tags;
      if (limit) params.limit = limit;
      if (offset) params.offset = offset;
      return params;
    }
  }

})();
