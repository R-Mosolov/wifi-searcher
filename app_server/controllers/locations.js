module.exports.homelist = function(req, res) {
    res.render('locations-list', {
        title: 'Поисковик Wi-Fi',

        pageHeader: {
            title: 'Поисковик Wi-Fi',
            strapline: 'Найдите свободное место с Wi-Fi!'
        },

        locations: [{
            name: 'Starbucks',
            address: 'Казань, ул. Петербургская, д. 1',
            facilities: ['Горячие напитки', 'Сладости Быстрый', 'Wi-Fi'],
            distance: '130'
        }, {
            name: 'Coffee Like',
            address: 'Казань, ул. Пушкина, д. 31',
            facilities: ['Горячие напитки', 'Сладости Быстрый', 'Wi-Fi'],
            distance: '100'
        }, {
            name: 'Кафетериус',
            address: 'Казань, ул. Петербургская, д. 9',
            facilities: ['Горячие напитки', 'Сладости Быстрый', 'Wi-Fi'],
            distance: '150'
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
