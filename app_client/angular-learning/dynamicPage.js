angular
    .module('dynamicPage')
    .controller('dynamicController', dynamicController);

function dynamicController () {
    $scope.dynamicData = 'World!'
}
