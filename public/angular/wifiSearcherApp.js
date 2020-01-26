angular
    .module('wifiSearcherApp', [])
    .controller('locationListCtrl', locationListCtrl)
    .directive('ratingStars', ratingStars);

function ratingStars() {
    return {
        scope: {
            thisRating: '=rating'
        },
        templateUrl: '/angular/rating-stars.html'
    };
}

function locationListCtrl($scope) {
    $scope.data = {
        locations: [{
            "_id": "5e1a2b1865eb210a55b93f62",
            "facilities": [
                "Свежий кофе",
                "Стильный интерьер",
                "Бесплатная парковка",
                "Красивый вид из окна"
            ],
            "rating": 4,
            "name": "Starbucks",
            "path": "id2359321",
            "coordinates": {
                "lat": "55.787992",
                "lng": "49.1195083"
            },
            "address": "Казань, ул. Пушкина, д. 9",
            "distance": 140
        }, {
            "_id": "5e1a34941c9d4400008f433d",
            "facilities": [
                "Быстрый Wi-Fi",
                "Стильный интерьер",
                "Красивый вид из окна",
                "Вежливый персонал"
            ],
            "rating": 3,
            "name": "Coffee Like",
            "path": "id4292834",
            "coordinates": {
                "lat": "55.793775",
                "lng": "49.124509"
            },
            "address": "Казань, ул. Пушкина, д. 31",
            "distance": 130
        }, {
            "_id": "5e1a3bbd1c9d4400008f433e",
            "facilities": [
                "Свежий кофе",
                "Быстрый Wi-Fi",
                "Бесплатная парковка",
                "Вежливый персонал"
            ],
            "name": "Кафетериус",
            "path": "id1334242",
            "coordinates": {
                "lat": "55.785303",
                "lng": "49.126433"
            },
            "rating": 5,
            "address": "Казань, ул. Петербургская, д. 9",
            "distance": 150
        }]
    };
}
