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
        title: 'О месте | Поисковик Wi-Fi'
    });
};

module.exports.addReview = function(req, res) {
    res.render('location-review-form', {
        title: 'Добавить отзыв | Поисковик Wi-Fi'
    });
};
