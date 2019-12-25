module.exports.homelist = function(req, res) {
    res.render('locations-list', { title: 'Поисковик Wi-Fi' });
};
module.exports.locationInfo = function(req, res) {
    res.render('location-info', { title: 'О месте | Поисковик Wi-Fi' });
};
module.exports.addReview = function(req, res) {
    res.render('location-review-form', { title: 'Добавить отзыв | Поисковик Wi-Fi' });
};
