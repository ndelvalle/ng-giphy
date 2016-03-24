(function () {
  'use strict';

  angular.module('ng-giphy')
    .directive('giphyId', findGiphyById);

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

    giphy.findById(vm.id, true).then(function (res) {
      vm.giphysrc = res;
    });
  }
})();
