var request = require('request');
var apiOptions = {
    server: 'http://localhost:3000'
};
if (process.env.NODE_ENV === 'production') {
    apiOptions.server = 'https://wifi-searcher.herokuapp.com/';
}

// MAIN FUNCTIONS
module.exports.homeList = function(req, res) {
    var requestOptions, path;
    path = '/api/locations';
    requestOptions = {
        url: apiOptions.server + path,
        method: 'GET',
        json: {},
        qs: {
            lng: 49.124563999999964,
            lat: 55.793598,
            maxDistance: 20
        }
    };
    request(
        requestOptions,
        function (err, response, body) {
            renderHomePage(res, req);
        }
    );
};

module.exports.locationInfo = function(req, res) {
    res.render('location-info', {
        title: 'Coffee Like | Поисковик Wi-Fi',

        pageHeader: {
            title: 'Coffee Like'
        },

        sidebar: {
            context: 'Место "Coffee Like" размещено здесь потому, что оно обладает доступным Wi-Fi и просторными ' +
                'креслами для работы на ноутбуке.',
            callToAction: 'Если Вы уже посещали это место, то будем очень рады получить Ваш отзыв о нём. Вы ' +
                'поможете нам стать лучше!'
        },

        location: {
            name: 'Coffee Like',
            address: 'Казань, ул. Пушкина, д. 31',
            rating: 3,
            facilities: ['Свежий кофе', 'Быстрый Wi-Fi', 'Стильный интерьер', 'Бесплатная парковка',
                'Хороший вид из окна'],
            coordinates: {
                lng: 49.124563999999964,
                lat: 55.793598
            },

            workingTimes: [{
                days: 'Пн-Пт',
                opening: '7:00',
                closing: '19:00',
                closed: false
            }, {
                days: 'Сб',
                opening: '8:00',
                closing: '17:00',
                closed: false
            }, {
                days: 'Вс',
                closed: true
            }]
        },

        reviews: [{
            reviewNumber: 1,
            author: 'Сергей С.',
            rating: 4,
            date: '26 декабря 2019',
            reviewText: 'В целом, здесь неплохо. Правда, очень медленный Wi-Fi :('
        }, {
            reviewNumber: 2,
            author: 'Роман М.',
            rating: 5,
            date: '25 декабря 2019',
            reviewText: 'Какое потрясающее место! Я обязательно вернусь сюда ещё раз.'
        }]
    });
};

module.exports.addReview = function(req, res) {
    res.render('location-review-form', {
        title: 'Добавить отзыв | Поисковик Wi-Fi',
        pageHeader: {
            title: 'Отзыв о Coffee Like'
        }
    });
};

// ADDITIONAL FUNCTION
var renderHomePage = function (res, req) {
    res.render('locations-list', {
        title: 'Поисковик Wi-Fi',

        pageHeader: {
            title: 'Поисковик Wi-Fi',
            strapline: 'Найдите свободное место с Wi-Fi!'
        },

        sidebar: 'Наше веб-приложение, "Поисковик Wi-Fi", поможет Вам найти подходящие, свободные места для отдыха ' +
            'или работы.',

        locations: [{
            name: 'Кафетериус',
            address: 'Казань, ул. Петербургская, д. 9',
            facilities: ['Горячие напитки', 'Удобные пуфики', 'Быстрый Wi-Fi'],
            rating: 5,
            distance: 150
        }, {
            name: 'Starbucks',
            address: 'Казань, ул. Петербургская, д. 1',
            facilities: ['Горячие напитки', 'Сладости', 'Быстрый Wi-Fi'],
            rating: 4,
            distance: 130
        }, {
            name: 'Coffee Like',
            address: 'Казань, ул. Пушкина, д. 31',
            facilities: ['Самообслуживание', 'Сладости', 'Быстрый Wi-Fi'],
            rating: 3,
            distance: 100
        }]
    });
};
