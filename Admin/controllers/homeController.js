const indexView = (req, res, next) => {
    res.render('./pages/home');
}

const iconView = (req, res, next) => {
    res.render('./pages/icons');
}

module.exports = {
    indexView,
    iconView
}