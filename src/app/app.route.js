(function (angular) {
    'use strict';
    angular.module('%%MAINMODULE%%')
        .config(Config);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function Config($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
        $stateProvider.state('home', {
            name: 'home',
            url: '/',
            template: '<main></main>'
        });
    }
})(window.angular);