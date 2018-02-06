(function (angular) {
    angular.module('%%MAINMODULE%%')
        .directive('main', [function () {
            return {
                restrict: "E",
                templateUrl: 'view/main.directive.html',
                controller: Controller,
                controllerAs: 'vm'
            };
        }]);

    Controller.$inject = ['$scope'];

    function Controller($scope) {
    }
})(window.angular);