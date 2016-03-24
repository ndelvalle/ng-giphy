(function () {
  'use strict';

  angular.module('ng-giphy')

    .provider('giphyConfig', giphyConfig)
    .config(ngGiphyConfig);

  // configure the provider to use the beta key
  ngGiphyConfig.$inject = ['giphyConfigProvider'];
  /* @ngInject */
  function ngGiphyConfig(giphyConfigProvider) {
    giphyConfigProvider.setKey('dc6zaTOxFJmzC');
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
