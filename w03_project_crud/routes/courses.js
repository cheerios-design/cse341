const express = require('express');
const router = express.Router();
const coursesController = require('../controllers/courses');
const validation = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/auth');

router.get('/', coursesController.getAll);
router.get('/:id', coursesController.getSingle);
router.post('/', isAuthenticated, validation.validateCourse, coursesController.createCourse);
router.put('/:id', isAuthenticated, validation.validateCourse, coursesController.updateCourse);
router.delete('/:id', isAuthenticated, coursesController.deleteCourse);

module.exports = router;
