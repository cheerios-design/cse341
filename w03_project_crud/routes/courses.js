const express = require('express');
const router = express.Router();
const coursesController = require('../controllers/courses');
const validation = require('../middleware/validate');

router.get('/', coursesController.getAll);
router.get('/:id', coursesController.getSingle);
router.post('/', validation.validateCourse, coursesController.createCourse);
router.put('/:id', validation.validateCourse, coursesController.updateCourse);
router.delete('/:id', coursesController.deleteCourse);

module.exports = router;
