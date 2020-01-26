var request = require('request');
var apiOptions = {
    server: 'http://localhost:3000'
};
if (process.env.NODE_ENV === 'production') {
    apiOptions.server = 'https://wifi-searcher.herokuapp.com';
}

// MAIN FUNCTIONS
module.exports.homeList = function(req, res) {
    renderHomePage(req, res);
};

module.exports.locationInfo = function(req, res) {
    getLocationInfo(req, res, function (req, res, responseData) {
        renderDetailsPage(req, res, responseData);
    });
};

module.exports.addReview = function(req, res) {
    getLocationInfo(req, res, function (req, res, responseData) {
        renderReviewForm(req, res, responseData);
    });
};

module.exports.sendReview = function(req, res) {
    var requestOptions, path, postData;
    path = `/api/locations/${req.params.path}/reviews`;
    postData = {
        author: req.body.author,
        rating: parseInt(req.body.rating, 10),
        reviewText: req.body.reviewText
    };
    requestOptions = {
        url: apiOptions.server + path,
        method: 'POST',
        json: postData
    };
    request(
        requestOptions,
        function (err, response) {
            if (response.statusCode === 201) {
                res.redirect('/');
            } else {
                _showError(req, res, response.statusCode);
            }
        }
    );
};

// ADDITIONAL FUNCTIONS
var renderHomePage = function (req, res) {
    res.render('locations-list', {
        title: 'Поисковик Wi-Fi',
        pageHeader: {
            title: `Поисковик <span class='text-break'> Wi-Fi`,
            strapline: 'Найдите свободное место с Wi-Fi!'
        },
        sidebar: 'Наше веб-приложение, "Поисковик Wi-Fi", поможет Вам найти подходящие, свободные места для отдыха ' +
            'или работы.',
        plug: 'К сожалению, на текущем этапе разработки ПО функция сортировки не работает. Приносим Вам ' +
            'извинения и просим вернуться к ней позднее.'
    });
};

var renderDetailsPage = function (req, res, locationDetails) {
    res.render('location-info', {
        title: locationDetails.name + ' | Поисковик Wi-Fi',
        pageHeader: {
            title: locationDetails.name
        },
        sidebar: {
            context: 'Место "Coffee Like" размещено здесь потому, что оно обладает доступным Wi-Fi и просторными ' +
                'креслами для работы на ноутбуке.',
            callToAction: 'Если Вы уже посещали это место, то будем очень рады получить Ваш отзыв о нём. Вы ' +
                'поможете нам стать лучше!'
        },
        location: locationDetails
    });
};

var renderReviewForm = function (req, res, locationDetails) {
    res.render('location-review-form', {
        title: `Отзыв на ${locationDetails.name}`,
        pageHeader: {
            title: `Отзыв на ${locationDetails.name}`
        }
    });
};

var getLocationInfo = function (req, res, callback) {
    var requestOptions, path;
    path = `/api/locations/${req.params.path}`;
    requestOptions = {
        url: apiOptions.server + path,
        method: 'GET',
        json: {}
    };
    request(
        requestOptions,
        function (err, response, body) {
            if (response.statusCode === 200) {
                callback(req, res, body);
            } else {
                _showError(req, res, response.statusCode);
            }
        }
    );
};

var _showError = function (req, res, status) {
    var title, content;
    if (status === 404) {
        title = 'Ошибка 404: страница не найдена';
        content = 'К сожалению, мы не смогли найти искомую Вами страницу. Вероятно, она не существует ' +
            'или была удалена. Приносим извинения!';
    } else {
        title = `Ошибка ${status}: что-то пошло не так`;
        content = 'К сожалению, случилось что-то неожиданное. Приносим извинения!'
    }
    res.status(status);
    res.render('error-message', {
        title: title,
        content: content
    });
};
