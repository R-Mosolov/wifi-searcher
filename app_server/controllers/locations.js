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
        json: {}
    };
    request(
        requestOptions,
        function (err, response, body) {
            renderHomePage(req, res, body);
        }
    );
};

module.exports.locationInfo = function(req, res) {
    var requestOptions, path;
    path = '/api/locations/' + req.params.locationId;
    requestOptions = {
        url: apiOptions.server + path,
        method: 'GET',
        json: {}
    };
    request(
        requestOptions,
        function (err, response, body) {
            var data = body;
            renderDetailPage(req, res, data);
        }
    );
};

module.exports.addReview = function(req, res) {
    res.render('location-review-form', {
        title: 'Добавить отзыв | Поисковик Wi-Fi',
        pageHeader: {
            title: 'Отзыв о Coffee Like'
        }
    });
};

// ADDITIONAL FUNCTIONS
var renderHomePage = function (req, res, responseBody) {
    res.render('locations-list', {
        title: 'Поисковик Wi-Fi',
        pageHeader: {
            title: 'Поисковик Wi-Fi',
            strapline: 'Найдите свободное место с Wi-Fi!'
        },
        sidebar: 'Наше веб-приложение, "Поисковик Wi-Fi", поможет Вам найти подходящие, свободные места для отдыха ' +
            'или работы.',
        locations: responseBody
    });
};

var renderDetailPage = function (req, res, locationDetail) {
    res.render('location-info', {
        title: locationDetail.name + ' | Поисковик Wi-Fi',
        pageHeader: {
            title: locationDetail.name
        },
        sidebar: {
            context: 'Место "Coffee Like" размещено здесь потому, что оно обладает доступным Wi-Fi и просторными ' +
                'креслами для работы на ноутбуке.',
            callToAction: 'Если Вы уже посещали это место, то будем очень рады получить Ваш отзыв о нём. Вы ' +
                'поможете нам стать лучше!'
        },
        location: locationDetail
    });
};
