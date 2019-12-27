module.exports.homelist = function(req, res) {
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

module.exports.locationInfo = function(req, res) {
    res.render('location-info', {
        title: 'Coffee Like',

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
            mapSource: 'https://yandex.ru/map-widget/v1/-/CGtHq63R',

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
            author: 'Сергей Сидоров',
            rating: 4,
            date: '26 декабря 2019',
            reviewText: 'В целом, здесь неплохо. Правда, очень медленный Wi-Fi :('
        }, {
            reviewNumber: 2,
            author: 'Роман Мосолов',
            rating: 5,
            date: '25 декабря 2019',
            reviewText: 'Какое потрясающее место! Я обязательно вернусь сюда ещё раз.'
        }]
    });
};

module.exports.addReview = function(req, res) {
    res.render('location-review-form', {
        title: 'Добавить отзыв | Поисковик Wi-Fi'
    });
};
