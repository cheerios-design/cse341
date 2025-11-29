const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/students', require('./students'));
router.use('/courses', require('./courses'));
router.use('/', require('./auth'));

module.exports = router;
