(function () {
  'use strict';

  angular.module('ng-giphy')
    .directive('giphyRand', findRandGiphy);

  /**
   * Directive: find random gif by tag
   */
  function findRandGiphy() {
    return {
      scope: {
        q     : '=giphyTag',
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

    giphy.random(vm.q, true).then(function (res) {
      vm.giphysrc = res;
    });
  }
})();
