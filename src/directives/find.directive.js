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
        q: '=gTag',
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

    giphy.findUrl(vm.q, 1).then(function (res) {
      vm.giphysrc = res[0];
    });
  }

})();
