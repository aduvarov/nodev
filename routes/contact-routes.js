const express = require('express');
const router = express.Router();
const { getContacts, getAboutUs } = require('../controllers/contact-controller');

router.get('/contacts', getContacts);

router.get('about-us', getAboutUs);

module.exports = router;
