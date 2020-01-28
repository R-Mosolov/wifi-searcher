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
        .then(function(res) {
            console.log(res.json());
            $scope.locations = res;
            console.log($scope.locations);
            if (res.status === 200) {
                console.log('Status 200: OK');
                $scope.locations = res.body.json();
                console.log($scope.locations);
            }
        })
        .catch(function(err) {
            console.log(err);
        });
    $scope.reverse = true;
    $scope.propertyName = 'rating';
    $scope.sortBy = function(propertyName) {
        $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
        $scope.propertyName = propertyName;
    };
}

function wifiSearcherData() {
    const responseLink = window.location + 'api/locations';
    return fetch(responseLink);
}
