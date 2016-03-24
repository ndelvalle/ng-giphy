(function () {
  'use strict';

  angular.module('ng-giphy')
    .directive('giphyFind', findGiphy);

  /**
   * Directive: find gif by tag
   */
  function findGiphy() {
    return {
      scope: {
        q     : '=giphyTag',
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

    giphy.find(vm.q, true).then(function (res) {
      vm.giphysrc = res;
    });
  }

})();
