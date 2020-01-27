angular
    .module('wifiSearcherApp', [])
    .controller('locationListCtrl', locationListCtrl)
    .directive('ratingStars', ratingStars)
    .service('wifiSearcherData', wifiSearcherData);

function ratingStars() {
    return {
        scope: {
            thisRating: '=rating'
        },
        templateUrl: '/angular/rating-stars.html'
    };
}

function locationListCtrl($scope, wifiSearcherData) {
    wifiSearcherData
        .then(function(data) {
            $scope.locations = data
        })
        .catch(function(error) {
            console.log(error);
        });
    $scope.reverse = true;
    $scope.propertyName = 'rating';
    $scope.sortBy = function(propertyName) {
        $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
        $scope.propertyName = propertyName;
    };
}

function wifiSearcherData() {
    return $http.get('/api/locations');
}
