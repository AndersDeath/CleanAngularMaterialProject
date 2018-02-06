(function (angular) {
    'use strict';
    angular.module('%%MAINMODULE%%')
        .config(['$mdIconProvider', function ($mdIconProvider) {
            $mdIconProvider
                .iconSet('action', 'icons/action-icons.svg', 24)
                .iconSet('alert', 'icons/alert-icons.svg', 24)
                .iconSet('av', 'icons/av-icons.svg', 24)
                .iconSet('communication', 'icons/communication-icons.svg', 24)
                .iconSet('content', 'icons/content-icons.svg', 24)
                .iconSet('device', 'icons/device-icons.svg', 24)
                .iconSet('editor', 'icons/editor-icons.svg', 24)
                .iconSet('file', 'icons/file-icons.svg', 24)
                .iconSet('hardware', 'icons/hardware-icons.svg', 24)
                .iconSet('icons', 'icons/icons-icons.svg', 24)
                .iconSet('image', 'icons/image-icons.svg', 24)
                .iconSet('maps', 'icons/maps-icons.svg', 24)
                .iconSet('navigation', 'icons/navigation-icons.svg', 24)
                .iconSet('notification', 'icons/notification-icons.svg', 24)
                .iconSet('social', 'icons/social-icons.svg', 24)
                .iconSet('toggle', 'icons/toggle-icons.svg', 24)
        }]);
})(window.angular);