const express = require('express');
const {indexView, iconView} = require('../controllers/homeController')
const router = express.Router();

router.get('/', indexView)
router.get('/icons', iconView)

module.exports = {
    routes: router
}