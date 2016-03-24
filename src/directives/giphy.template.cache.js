(function () {
  'use strict';

  angular.module('ng-giphy')

    .run(templateCache);templateCache.$inject = ['$templateCache'];
  /* @ngInject */
  function templateCache($templateCache) {
    $templateCache.put('imgTemplate.html', '<img ng-src="{{ vm.giphysrc }}">');
  }

})();
